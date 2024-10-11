// src/controllers/userController.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie, { serialize } from 'cookie';
import User from '@/models/userModel';
import connectToDatabase from '@/config/database';
import { NextApiRequest, NextApiResponse } from 'next';

// get all users
export const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conectar ao banco de dados
  await connectToDatabase();
  try {
    // Encontrar todos os usuários no banco de dados
    const users = await User.find({});
    // Retornar os usuários encontrados como resposta
    res.status(200).json(users);
  } catch (e) {
    // Se ocorrer algum erro, enviar uma resposta de erro com status 500
    res.status(500).json({ message: 'Erro no controller ao buscar todos os usuarios' })
  }
};

// create user
export const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conecta ao banco de dados
  await connectToDatabase();
  // Extrair dados do corpo da requisição
  const { email, password } = req.body;
  try {
    // Verifica se o usuário já existe no banco de dados; Verificar se o email já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Se o email já estiver em uso, enviar uma resposta com status 400 (Bad Request)
      return res.status(400).json({ message: 'O usuário já existe' });
    }
    // Gera um hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    // Cria uma nova instância do usuário com a senha hashada
    const newUser = new User({ email, password: hashedPassword });
    // Salva o novo usuário no banco de dados
    await newUser.save();
    // Retorna uma resposta de sucesso
    res.status(201).json({ 
      message: 'Usuário cadastrado com sucesso.', 
      user: newUser 
    });
  } catch (error) {
    // Se ocorrer algum erro, enviar uma resposta de erro com status 500
    console.error('Erro no cadastro de usuário:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Expiração para o token de acesso (curto prazo)
const ACCESS_TOKEN_EXPIRATION = '15m'; // 15 minutos
// Expiração para o token de atualização (longo prazo)
const REFRESH_TOKEN_EXPIRATION = '7d'; // 7 dias
// login
export const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  
  // Chave secreta para assinar/criar o token JWT do user
  const JWT_SECRET = process.env.JWT_SECRET;
  // Chave secreta para renovar o token JWT do user
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

  // Verificar se JWT_SECRET está definido
  if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error('JWT_SECRET ou JWT_REFRESH_SECRET não está definido.');
  }

  // verifica se o método é POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  // Verificar se o email e a senha foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
  }
  
  // Conecta ao banco de dados
  await connectToDatabase();

  try {
    // Encontra o usuário pelo email
    const user = await User.findOne({ email });

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    // Verifica se a senha é válida
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gerar o token de acesso (expira em 15 minutos)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email }, 
      `${JWT_SECRET}`, 
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );

    // Gerar o token de atualização (expira em 7 dias)
    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email }, 
      JWT_REFRESH_SECRET, 
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    // Definir o cookie HttpOnly para o refreshToken
    res.setHeader('Set-Cookie', serialize('refreshToken', refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Use secure apenas em produção
      secure: process.env.NODE_ENV === 'development',
      // sameSite: 'strict',
      sameSite: 'lax',
      path: '/', // Caminho para o qual o cookie é válido
      maxAge: 7 * 24 * 60 * 60, // 7 dias em segundos
    }));

    // Retorna o token JWT
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}

// delete user
export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conecta ao banco de dados
  await connectToDatabase();
  // const { id } = req.query;
  const userId = req.query.id as string; // Obtém o ID do usuário a ser excluído da consulta
  if (!userId) {
    return res.status(400).json({ message: 'ID do usuário não fornecido.' });
  }
  try {
    // Verifica se o usuário existe no banco de dados
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    // Exclui o usuário do banco de dados
    await User.findByIdAndDelete(userId);
    // Retorna uma resposta de sucesso
    return res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

// update password
export const updatePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Chave secreta para assinar o token JWT
    const JWT_SECRET = process.env.JWT_SECRET;

    // Verificar se JWT_SECRET está definido
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET não está definido.');
    }

    // Verificar se o método é POST
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    // Extrair email, senha atual e nova senha do corpo da requisição
    const { email, currentPassword, newPassword } = req.body;

    // Verificar se o email, senha atual e nova senha foram fornecidos
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Por favor, forneça email, senha atual e nova senha.' });
    }

    // Conectar ao banco de dados
    await connectToDatabase();

    // Encontrar o usuário pelo email
    const user = await User.findOne({ email });

    // Verificar se o usuário existe
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar se a senha atual fornecida corresponde à senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha atual inválida.' });
    }

    // Gerar um hash da nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar a senha do usuário no banco de dados
    user.password = hashedNewPassword;
    await user.save();

    // Retornar uma resposta de sucesso
    return res.status(200).json({ message: 'Senha atualizada com sucesso.' });
  } catch (error) {
    // Se ocorrer algum erro, enviar uma resposta de erro com status 500
    console.error('Erro ao atualizar senha do usuário:', error);
    return res.status(500).json({ message: 'Erro ao atualizar senha do usuário.' });
  }
}

// renovar token
export const renewToken = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

  if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error('JWT_SECRET ou JWT_REFRESH_SECRET não estão definidos.');
  }

  // Obter o refreshToken do cookie
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(400).json({ message: 'Cookies não fornecidos' });
  }
  const { refreshToken } = cookie.parse(cookies);

  if (!refreshToken) {
    return res.status(400).json({ message: 'Token de atualização não fornecido' });
  }

  try {
    // Verificar e decodificar o token de atualização
    const decoded = jwt.verify(refreshToken, `${JWT_REFRESH_SECRET}`) as { userId: string };

    // Verificar se o usuário ainda existe no banco de dados
    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Gerar um novo token de acesso
    const newAccessToken  = jwt.sign({ userId: user._id }, `${JWT_SECRET}`, { expiresIn: '24h' });

    // Opcional: gerar um novo token de atualização (se necessário)
    const newRefreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Atualizar o refreshToken no cookie (se gerando um novo)
    res.setHeader('Set-Cookie', cookie.serialize('refreshToken', newRefreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'development',
      // sameSite: 'strict',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    }));

    // Retornar apenas o novo token de acesso no corpo da resposta
    res.status(200).json({
      accessToken: newAccessToken,
      message: 'Tokens renovados com sucesso',
    });

  } catch (error) {
    console.error('Erro ao renovar os tokens:', error);
    res.status(401).json({ message: 'Token de atualização inválido ou expirado' });
  }

};