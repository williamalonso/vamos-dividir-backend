import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';
import connectToDatabase from '@/config/database';
import { NextApiRequest, NextApiResponse } from 'next';


/**
 * @swagger
 * /api/user/getall:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of all users from the database.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: 'Erro no controller ao buscar todos os usuarios' })
  }
};