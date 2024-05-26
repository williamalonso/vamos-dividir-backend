import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUser } from '@/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    // Chama o controlador para excluir o usuário
    await deleteUser(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
