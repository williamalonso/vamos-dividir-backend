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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
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
      },
      '/api/user/update': {
        post: {
          summary: 'Atualiza a senha de um usuário',
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'johndoe@example.com' },
                    currentPassword: { type: 'string', example: 'CurrentPassword123!' },
                    newPassword: { type: 'string', example: 'NewPassword456!' }
                  },
                  required: ['email', 'currentPassword', 'newPassword']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Senha atualizada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Senha atualizada com sucesso.' }
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
                      message: { type: 'string', example: 'Por favor, forneça email, senha atual e nova senha.' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Senha atual inválida',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Senha atual inválida.' }
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
                      message: { type: 'string', example: 'Usuário não encontrado.' }
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
                      message: { type: 'string', example: 'Erro ao atualizar senha do usuário.' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/auth/renew': {
        post: {
          summary: 'Renova o token JWT de um usuário',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                  },
                  required: ['token']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Token renovado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                      message: { type: 'string', example: 'Token renovado com sucesso' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Token não fornecido',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Token não fornecido' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Token inválido ou expirado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Token inválido ou expirado' }
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
      },
      '/api/demand/create': {
        post: {
          summary: 'Cria uma nova demanda',
          tags: ['Demand'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string', example: 'Título da demanda' },
                    description: { type: 'string', example: 'Descrição detalhada da demanda' }
                  },
                  required: ['title', 'description']
                }
              }
            }
          },
          parameters: [
            {
              name: 'Authorization',
              in: 'header',
              required: true,
              schema: {
                type: 'string',
                example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
              },
              description: 'Token JWT para autenticação'
            }
          ],
          responses: {
            201: {
              description: 'Demanda criada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Demanda criada com sucesso' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Título, descrição ou userId não fornecidos',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Título e descrição são obrigatórios' }
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
      '/api/demand/delete/{demandId}': {
        delete: {
          summary: 'Deleta uma demanda',
          tags: ['Demand'],
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'demandId',
              in: 'path',
              required: true,
              description: 'ID da demanda a ser deletada',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Demanda deletada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Demanda deletada com sucesso' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'ID da demanda ou userId não fornecidos',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'userId nao fornecido' }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Demanda não encontrada',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Demanda não encontrada' }
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
                      message: { type: 'string', example: 'Erro ao deletar demanda' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/demand/demandId/{demandId}': {
        get: {
          summary: 'Obter uma demanda por ID',
          tags: ['Demand'],
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'demandId',
              in: 'path',
              required: true,
              description: 'ID da demanda a ser obtida',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Demanda obtida com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      user: { type: 'string' },
                      title: { type: 'string' },
                      description: { type: 'string' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    }
                  },
                  example: {
                    _id: '60d9f9f5f29b9c001c8e4d3b',
                    user: '60d9f9f5f29b9c001c8e4d3a',
                    title: 'Título da demanda',
                    description: 'Descrição detalhada da demanda',
                    createdAt: '2023-05-27T14:56:28.029Z',
                    updatedAt: '2023-05-27T14:56:28.029Z'
                  }
                }
              }
            },
            400: {
              description: 'ID da demanda ou userId não fornecidos',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'demandId nao fornecido' }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Demanda não encontrada',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Demanda não encontrada' }
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
                      message: { type: 'string', example: 'Erro ao buscar a demanda' }
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
