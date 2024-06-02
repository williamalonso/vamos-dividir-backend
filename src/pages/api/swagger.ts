// pages/api/swagger.ts

import { NextApiRequest, NextApiResponse } from 'next';
import swaggerSpec from "@/config/swagger.config";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(swaggerSpec);
}