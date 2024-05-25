// models/userModel.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  jwtToken?: string;
}

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

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;