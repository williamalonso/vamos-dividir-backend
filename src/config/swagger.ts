// src/config/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API - Vamos Dividir',
      version: '1.0.0',
      description: 'Esta é a documentação da API - Vamos Dividir',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'The email of the user',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              description: 'The hashed password of the user',
              example: 'hashedpassword123',
            },
            jwtToken: {
              type: 'string',
              description: 'The JWT token for the user',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
          required: ['email', 'password'],
        },
      },
    },
  },
  apis: ['./src/controllers/**/*.ts', './src/models/**/*.ts'], // Ajuste para o caminho correto
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec };
