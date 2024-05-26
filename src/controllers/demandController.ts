import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/config/database';
import Demand from '@/models/demandModel';

export const createDemand: (req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (req, res) => {
  // Conecta ao banco de dados
  await connectToDatabase();

  const { userId, title, description } = req.body;

  try {
    // Cria uma nova instância da demanda com o ID do usuário associado
    const newDemand = new Demand({ user: userId, title, description });
    await newDemand.save();

    // Retorna uma resposta de sucesso
    return res.status(201).json({ message: 'Demanda criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar demanda:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};
