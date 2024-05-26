import bcrypt from 'bcrypt';
import { userInterface } from '@/interface/userInterface';

export const hashPassword = async function(this: userInterface, next: Function) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error:any) {
    next(error);
  }
};
