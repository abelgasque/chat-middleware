import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "user-api",
      description: "Aplicação para gestão de usuários.",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["firstName", "lastName", "email", "password", "active"],
          properties: {
            firstName: {
              type: "string",
              description: "Primeiro nome do usuário",
            },
            lastName: {
              type: "string",
              description: "Sobrenome do usuário",
            },
            email: {
              type: "string",
              format: "email",
              description: "Endereço de e-mail do usuário",
            },
            password: {
              type: "string",
              format: "password",
              description: "Senha do usuário (mínimo de 7 caracteres)",
            },
            active: {
              type: "boolean",
              description: "Indica se o usuário está ativo ou não",
            },
          },
        },
        UserAuth: {
          type: "object",
          required: ["firstName", "lastName", "email", "password", "active"],
          properties: {
            username: {
              type: "string",
              format: "email",
              description: "Endereço de e-mail do usuário",
            },
            password: {
              type: "string",
              format: "password",
              description: "Senha do usuário (mínimo de 7 caracteres)",
            }
          },
        },
        RefreshAuth: {
          type: "object",
          required: ["refresh_token"],
          properties: {
            refresh_token: {
              type: "string",
              description: "Token para autenticação",
            }
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, "../api/routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpec };