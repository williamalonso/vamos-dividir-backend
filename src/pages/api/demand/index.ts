// src/pages/api/demand/index.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { getDemandById } from '@/controllers/demandController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Chama o controlador para buscar a demanda pelo ID
    await getDemandById(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
