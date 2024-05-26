import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/config/database';
import Demand from '@/models/demandModel';

// Cria demanda
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

// Busca todas as demandas de um User
export const getUserDemands = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conecta ao banco de dados
  await connectToDatabase();

  const userId = req.query.userId as string; // Obtém o ID do usuário da consulta

  try {
    // Encontra todas as demandas associadas ao usuário
    const demands = await Demand.find({ user: userId });
    
    // Retorna as demandas encontradas
    res.status(200).json(demands);
  } catch (error) {
    console.error('Erro ao buscar as demandas do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar as demandas do usuário' });
  }
};