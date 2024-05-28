// src/pages/api/demand/delete/[demandId]/index.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { deleteDemand } from '@/controllers/demandController';
import authMiddleware from '@/middleware/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    // Chama o controlador para deletar a demanda pelo ID
    await deleteDemand(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};

// Envolver o handler com authMiddleware
export default authMiddleware(handler);