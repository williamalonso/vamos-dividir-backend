import { NextApiRequest, NextApiResponse } from 'next';
import { getUserDemands } from '@/controllers/demandController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Chama o controlador para buscar as demandas do usuário
    await getUserDemands(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
