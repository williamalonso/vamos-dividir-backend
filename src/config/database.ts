// config/database.ts

import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  throw new Error('Please add your Mongo URI to .env');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
    process.exit(1); // Opcional: encerra o processo caso a conexão falhe
  }
};

export default connectToDatabase;