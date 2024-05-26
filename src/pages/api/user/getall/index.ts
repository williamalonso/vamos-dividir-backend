import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers } from '@/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      await getAllUsers(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}