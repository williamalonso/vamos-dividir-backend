import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';
import connectToDatabase from '@/config/database';
import { NextApiRequest, NextApiResponse } from 'next';

// get all users
export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: 'Erro no controller ao buscar todos os usuarios' })
  }
};

// login
export const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {

  const secretKey = process.env.JWT_TOKEN;

  if (!secretKey) {
    return res.status(500).json({ message: 'Chave JWT não definida' });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Conecta ao banco de dados
  await connectToDatabase();

  const { email, password } = req.body;

  try {
    // Encontra o usuário pelo email
    const user = await User.findOne({ email });

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verifica se a senha é válida
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Retorna o token JWT
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}