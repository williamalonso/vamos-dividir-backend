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

// Faz um hash na senha do usuário antes de ser salva no banco de dados sempre que um novo usuário for criado ou a senha de um usuário existente for atualizada
userSchema.pre<userInterface>('save', hashPassword);

const User = mongoose.models.User || mongoose.model<userInterface>('User', userSchema);

export default User;