// controllers/userController.ts

import User from '@/models/userModel';
import connectToDatabase from '@/config/database';
import { NextApiRequest, NextApiResponse } from 'next';

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: 'Erro no controller ao buscar todos os usuarios' })
  }
};
