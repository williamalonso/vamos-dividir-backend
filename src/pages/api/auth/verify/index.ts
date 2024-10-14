// src/pages/api/auth/verify/index.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken  } from '@/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await verifyToken(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}