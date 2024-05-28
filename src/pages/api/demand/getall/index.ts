// src/pages/api/demand/getall/index.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { getUserDemands } from '@/controllers/demandController';
import authMiddleware from '@/middleware/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // Chama o controlador para buscar as demandas do usuário
    await getUserDemands(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};

// Envolver o handler com authMiddleware
export default authMiddleware(handler);
