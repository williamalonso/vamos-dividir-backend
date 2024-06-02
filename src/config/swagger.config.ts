// swagger.config.ts

import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vamos Dividir API',
      version: '1.0.0',
      description: 'Documentação da API Vamos Dividir',
    },
    servers: [
      { url: 'http://localhost:3000' },
      { url: 'https://vamos-dividir-backend.vercel.app' }
    ],
    paths: {
      '/api/user/getall': {
        get: {
          summary: 'Retorna todos os usuários',
          tags: ['User'],
          responses: {
            200: {
              description: 'Lista de todos os usuários',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        // Defina as propriedades do usuário conforme seu modelo
                        _id: { type: 'string', example: '60c72b2f9b1d4c23d8a25f4b' },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'johndoe@example.com' },
                        // Adicione outras propriedades do modelo de usuário aqui
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Erro no servidor ao buscar todos os usuários',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Erro no controller ao buscar todos os usuarios' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/user/create': {
        post: {
          summary: 'Cria um novo usuário',
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'johndoe@example.com' },
                    password: { type: 'string', example: 'Password123!' }
                  },
                  required: ['email', 'password']
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Usuário cadastrado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Usuário cadastrado com sucesso.' },
                      user: {
                        type: 'object',
                        properties: {
                          _id: { type: 'string', example: '60c72b2f9b1d4c23d8a25f4b' },
                          email: { type: 'string', example: 'johndoe@example.com' },
                          password: { type: 'string', example: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36ZZz27TPwskUfp7TfZCK' } // hashed password
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'O usuário já existe',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'O usuário já existe' }
                    }
                  }
                }
              }
            },
            500: {
              description: 'Erro no servidor',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Erro no servidor' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/user/login': {
        post: {
          summary: 'Autentica um usuário',
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'johndoe@example.com' },
                    password: { type: 'string', example: 'Password123!' }
                  },
                  required: ['email', 'password']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Login bem-sucedido',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Requisição inválida',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Por favor, forneça email e senha.' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Credenciais inválidas',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Usuário não encontrado ou senha inválida.' }
                    }
                  }
                }
              }
            },
            405: {
              description: 'Método não permitido',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Método não permitido' }
                    }
                  }
                }
              }
            },
            500: {
              description: 'Erro no servidor',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Erro no servidor' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/user/delete': {
        delete: {
          summary: 'Exclui um usuário',
          tags: ['User'],
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
                example: '60c72b2f9b1d4c23d8a25f4b'
              },
              description: 'ID do usuário a ser excluído'
            }
          ],
          responses: {
            200: {
              description: 'Usuário excluído com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Usuário excluído com sucesso' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'ID do usuário não fornecido',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'ID do usuário não fornecido.' }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Usuário não encontrado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Usuário não encontrado' }
                    }
                  }
                }
              }
            },
            500: {
              description: 'Erro no servidor',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Erro no servidor' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  },
  apis: [], // Deixe vazio porque estamos definindo os endpoints diretamente aqui
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
