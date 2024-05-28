// middleware/authMiddleware.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido.');
}

const authMiddleware = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  
  // Verificar se o token está presente nos cabeçalhos da requisição
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token de autorização não fornecido' });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, `${JWT_SECRET}`);

    // Adicionar o ID do usuário decodificado à requisição para uso posterior
    (req as any).userId = (decoded as { userId: string }).userId;

    // Chamar o próximo handler da cadeia de middlewares
    return handler(req, res);
  } catch (error) {
    console.error('Erro de autenticação no token:', error);
    return res.status(401).json({ message: 'Falha na autenticação do token' });
  }
};

export default authMiddleware;
