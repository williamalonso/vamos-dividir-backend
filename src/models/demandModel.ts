// src/models/demandModel.ts

import mongoose, { Schema } from 'mongoose';
import { demandInterface } from '@/interface/demandInterface';

const demandSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Defina outros campos da demanda conforme necessário
});

const Demand = mongoose.models.Demand || mongoose.model<demandInterface>('Demand', demandSchema);

export default Demand;
