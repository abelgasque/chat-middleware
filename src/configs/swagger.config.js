const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "user-api",
      description: "Aplicação para gestão de usuários.",
      version: "1.0.0",
    },
    securityDefinitions: {
      bearerAuth: {
        type: process.env.JWT_SECRET,
        name: 'Authorization',
        in: 'header',
        scheme: 'bearer',
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
};