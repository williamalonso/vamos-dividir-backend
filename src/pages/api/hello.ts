// Função para habilitar CORS

import { NextApiRequest, NextApiResponse } from 'next';

const allowCors = (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://www.google.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

// Handler que retorna "Hello World"
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('Hello World');
};

// Exportando o handler encapsulado com CORS
export default allowCors(handler);