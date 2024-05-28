// swagger.config.ts

import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API',
      version: '1.0.0',
      description: 'Documentação da API Next.js',
    },
    servers: [
      { url: 'http://localhost:3000' },
      { url: 'https://vamos-dividir-backend.vercel.app' }
    ],
    paths: {
      '/api/hello': {
        get: {
          summary: 'Retorna uma mensagem de hello world',
          tags: ['Example'],
          responses: {
            200: {
              description: 'Mensagem de sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Hello, world!',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // Deixe vazio porque estamos definindo os endpoints diretamente aqui
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
