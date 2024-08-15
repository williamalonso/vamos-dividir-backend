// src/interface/demandInterface.ts

import mongoose, { Document } from 'mongoose';

export interface demandInterface extends Document {
  user: mongoose.Types.ObjectId; // Referência ao usuário que criou a demanda
  title: string;
  peopleNames: string[];
  // Outros campos da demanda
}