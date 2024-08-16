// src/pages/api/demand/create/index.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { createDemand } from '@/controllers/demandController';
import authMiddleware from '@/middleware/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Chama o controlador para criar a demanda
    await createDemand(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};

// Envolver o handler com authMiddleware
export default authMiddleware(handler);