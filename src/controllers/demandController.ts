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

// Busca demanda especifica por id
export const getDemandById = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conecta ao banco de dados
  await connectToDatabase();

  const demandId = req.query.demandId as string; // Obtém o ID da demanda da consulta

  try {
    // Encontra a demanda com o ID especificado
    const demand = await Demand.findById(demandId);
    
    // Verifica se a demanda foi encontrada
    if (!demand) {
      return res.status(404).json({ message: 'Demanda não encontrada' });
    }

    // Retorna a demanda encontrada
    res.status(200).json(demand);
  } catch (error) {
    console.error('Erro ao buscar a demanda:', error);
    res.status(500).json({ message: 'Erro ao buscar a demanda' });
  }
};

// atualiza demanda especifica por id
export const updateDemand = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conecta ao banco de dados
  await connectToDatabase();

  // Extrai o ID da demanda e os novos dados da requisição
  const { id } = req.query;
  const { title, description } = req.body;

  try {
    // Verifica se a demanda com o ID fornecido existe
    const existingDemand = await Demand.findById(id);

    if (!existingDemand) {
      return res.status(404).json({ message: 'Demanda não encontrada' });
    }

    // Atualiza os dados da demanda com os novos dados
    existingDemand.title = title;
    existingDemand.description = description;

    // Salva as alterações no banco de dados
    await existingDemand.save();

    // Retorna uma resposta de sucesso
    res.status(200).json({ message: 'Demanda atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar demanda:', error);
    res.status(500).json({ message: 'Erro ao atualizar demanda' });
  }
};

// deleta demanda
export const deleteDemand = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conecta ao banco de dados
  await connectToDatabase();

  const { demandId, userId } = req.query;

  try {
    // Verifica se a demanda existe e pertence ao usuário
    const demand = await Demand.findOne({ _id: demandId, user: userId });

    if (!demand) {
      return res.status(404).json({ message: 'Demanda não encontrada' });
    }

    // Remove a demanda
    await Demand.deleteOne({ _id: demandId });

    // Retorna uma resposta de sucesso
    return res.status(200).json({ message: 'Demanda deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar demanda:', error);
    return res.status(500).json({ message: 'Erro ao deletar demanda' });
  }
};