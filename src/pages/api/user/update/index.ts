import { NextApiRequest, NextApiResponse } from 'next';
import { updatePassword } from '@/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Chama o controlador de login para lidar com a solicitação de login
    await updatePassword(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
