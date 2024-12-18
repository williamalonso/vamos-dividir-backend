// src/pages/api/user/create/index.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '@/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Chama o controlador de cadastro de usuários para lidar com a solicitação de cadastro
    await registerUser(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}