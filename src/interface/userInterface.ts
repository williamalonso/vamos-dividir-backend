import { Document } from 'mongoose';

export interface userInterface extends Document {
  email: string;
  password: string;
  jwtToken?: string;
}
