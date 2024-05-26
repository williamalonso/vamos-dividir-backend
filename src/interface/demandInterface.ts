import mongoose, { Document } from 'mongoose';

export interface demandInterface extends Document {
  user: mongoose.Types.ObjectId; // Referência ao usuário que criou a demanda
  title: string;
  description: string;
  // Outros campos da demanda
}