// src/interface/userInterface.ts

import { Document } from 'mongoose';

export interface userInterface extends Document {
  email: string;
  password: string;
  jwtToken?: string;
  isPremium: boolean;
}
