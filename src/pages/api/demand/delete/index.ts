import { NextApiRequest, NextApiResponse } from 'next';
import { deleteDemand } from '@/controllers/demandController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    // Chama o controlador para deletar a demanda pelo ID
    await deleteDemand(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
