// src/config/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API - Vamos Dividir',
      version: '1.0.0',
      description: 'Esta é a documentaçao da API - Vamos Dividir',
    },
  },
  apis: ['./src/controllers/*.ts', './src/models/*.ts'], // Ajuste para o caminho correto
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec };
