// src/pages/api/demand/update/[demandId]/index.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { updateDemand } from '@/controllers/demandController';
import authMiddleware from '@/middleware/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    // Chama o controlador para atualizar a demanda pelo ID
    await updateDemand(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};

// Envolver o handler com authMiddleware
export default authMiddleware(handler);