import { NextApiRequest, NextApiResponse } from 'next';
import { updateDemand } from '@/controllers/demandController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    // Chama o controlador para atualizar a demanda pelo ID
    await updateDemand(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
