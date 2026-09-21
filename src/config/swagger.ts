import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',

    info: {
      title: "UrbanFit API",
      version: '1.0.0',
      description: 
        'API RESTful do sistema da loja virtual da UrbanFit. ' +
        'Fluxo típico: cadastre um cliente, faça login para obter um token JWT ' +
        'e use o botão **Authorize** acima para testar as rotas protegidas. ',
    },

    servers: [
      { url: 'http://localhost:3333', description: 'Ambiente de desenvolvimento'}
    ],

    tags: [
      {name: 'Autenticação', description: 'Login e emissão de token JWT' },
      {name: 'Cliente', description: 'Cadastro e consulta de clientes' },
      {name: 'Pedido', description: 'Emissão do pedido de compra' },
      {name: 'Item', description: 'Item específico para o pedido' },
      {name: 'Estoque', description: 'Gestão de opções de produto e estoque' },
      {name: 'Produto', description: 'Cadastro de produto'},
      {name: 'Categoria', description: 'Cadastro de categoria(tipo) de produto'},
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Cole aqui o token JWT obtido por POST /api/auth/login (sem prefixo "bearer")'
        },
      },

      schemas: {
        RespostaErro: {
          type: 'object',
          properties: {
            erro: {type: 'string', example: 'Mensagem explicando o que deu errado'}
          },
        },

        Cliente: {
          type: 'object',
          description: 'Cliente sem senha (a senha nunca sai do banco de dados)',
          properties: {
            id:         {type: 'integer', example: 1},
            nome:       {type: 'string', example: 'Senhorita Bytes'},
            cpf:        {type: 'string', example: '12345678912'},
            email:      {type: 'string', example: 'bytes@teste.com'},
            telefone:   {type: 'string', example: '24123456789'},
            criadoEm:   {type: 'string', format: 'date-time'},
          },
        },

        Pedido: {
          type: 'object',
          description: 'Pedido de compra',
          properties: {
            id:             {type: 'integer', example: 1},
            cliente_id:     {type: 'integer', example: 1},
            valor_final:    {type: 'number', example: 100},
            status: {
              type: 'string',
              enum: ['PENDENTE', 'FINALIZADO', 'CANCELADO'],
              example: 'PENDENTE'
            },
            data_pedido:    {type: 'string', format: 'date-time'},
            data_entrega:   {type: 'string', format: 'date-time'},
            cliente: {$ref: '#/components/schemas/Cliente'},
          },
        },

        Item_pedido: {
          type: 'object',
          description: 'Item especificado para compra',
          properties: {
            id:                 {type: 'integer', example: 1},
            pedido_id:          {type: 'integer', example: 1},
            estoque_opcao_id:   {type: 'integer', example: 1},
            quantidade:         {type: 'integer', example: 1},
            preco_sub_total:    {type: 'number', example: 1000},
          },
          pedido: {$ref: '#/components/schemas/Pedido'},
          estoque_opcao: {$ref: '#/components/schemas/Estoque'}
        },

        Estoque: {
          type: 'object',
          description: 'Opção de estoque de um produto',
          properties: {
            id: {type: 'integer', example: 1},
            produto_id: {type: 'integer', example: 1},
            cor: {type: 'string', example: 'AZUL'},
            tamanho: {type: 'string', example: 'G'},
            quantidade_estoque: {type: 'integer', example: 10}
          },
          produto: {$ref: '#/components/schemas/Produto'}
        },

        Produto: {
          type: 'object',
          description: 'Produtos da loja',
          properties: {
            id: {type: 'integer', example: 1},
            categoria_id: {type: 'integer', example: 1},
            nome: {type: 'string', example: 'Casaco preto com gomas Adidas'},
            marca: {type: 'string', example: 'ADIDAS'},
            preco_base: {type: 'number', example: 1.99},
          },
          categoria: {$ref: '#/components/schemas/Categoria'}
        },

        Categoria: {
          type: 'object',
          description: 'Categoria/tipo de produto',
          properties: {
            id: {type: 'integer', example: 1},
            nome: {type: 'string', example: 'CAMISETA'},
            descricao: {type: 'string', example: 'Categoria para todas as |camisetas|'}
          },
        },
      },
    },
  },
  
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
});