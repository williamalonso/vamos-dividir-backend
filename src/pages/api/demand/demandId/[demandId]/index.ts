// src/pages/api/demand/demandId/[demandId]/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDemandById } from '@/controllers/demandController';
import authMiddleware from '@/middleware/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // Chama o controlador para buscar a demanda pelo ID
    await getDemandById(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};

// Envolver o handler com authMiddleware
export default authMiddleware(handler);