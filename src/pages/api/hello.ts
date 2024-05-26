// pages/api/hello.ts

import { NextApiRequest, NextApiResponse } from 'next';


/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Retorna uma mensagem de Hello World
 *     responses:
 *       200:
 *         description: A mensagem Hello World
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Hello World' });
}
