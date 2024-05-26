// src/middleware/passwordMiddleware.ts
import bcrypt from 'bcrypt';
import { userInterface } from '@/interface/userInterface';

export const hashPassword = async function(this: userInterface, next: Function) {
  
  // Antes de prosseguir com o hash da senha, verificamos se a senha foi modificada utilizando this.isModified('password').
  // Se a senha não foi modificada (ou seja, se é uma senha existente sendo atualizada), a função next() é chamada para avançar para o próximo middleware.
  // Isso evita que a senha seja hashada novamente se não houver necessidade.
  if (!this.isModified('password')) return next();

  try {

    // Se a senha foi modificada (ou seja, é uma nova senha ou uma senha atualizada), prosseguimos com a geração de um "salt" (um valor aleatório usado para aumentar a segurança do hash) usando bcrypt.genSalt.
    const salt = await bcrypt.genSalt(10);

    // Em seguida, utilizamos o "salt" gerado para realizar o hash da senha usando bcrypt.hash.
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // O resultado é a senha hashada, que substitui a senha original no documento do usuário (this.password = hashedPassword).
    this.password = hashedPassword;
    
    // Após o hash da senha ser concluído com sucesso, chamamos next() para avançar para o próximo middleware ou para concluir o processo de salvamento do documento.
    next();

  } catch (error:any) {
    next(error);
  }
};
