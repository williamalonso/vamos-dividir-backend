import { NextApiRequest, NextApiResponse } from 'next';
import { register } from '@/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Chama o controlador de cadastro de usuários para lidar com a solicitação de cadastro
    await register(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}