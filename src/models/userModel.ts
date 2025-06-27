// src/models/userModel.ts
import mongoose, { Schema } from 'mongoose';
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
  isPremium: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.models.User || mongoose.model<userInterface>('User', userSchema);

export default User;