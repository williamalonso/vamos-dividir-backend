import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';
import connectToDatabase from '@/config/database';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/user/getall:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of all users from the database.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
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

// create user
export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conecta ao banco de dados
  await connectToDatabase();

  const { email, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'O usuário já existe' });
    }

    // Gera um hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria uma nova instância do usuário com a senha hashada
    const newUser = new User({ email, password: hashedPassword });

    // Salva o novo usuário no banco de dados
    await newUser.save();

    // Retorna uma resposta de sucesso
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro no cadastro de usuário:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

// delete user
export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conecta ao banco de dados
  await connectToDatabase();

  const userId = req.query.id as string; // Obtém o ID do usuário a ser excluído da consulta

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