// src/pages/api/auth/renew/index.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { renewToken } from '@/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await renewToken(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}