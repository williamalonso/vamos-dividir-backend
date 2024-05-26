import mongoose, { Schema, Document } from 'mongoose';
import { hashPassword } from '@/middleware/passwordMiddleware';
import { userInterface } from '@/interface/userInterface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  jwtToken: {
    type: String,
  }
});

// Use a função de pré-salvamento definida no middleware
userSchema.pre<userInterface>('save', hashPassword);

const User = mongoose.models.User || mongoose.model<userInterface>('User', userSchema);

export default User;