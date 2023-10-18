require("dotenv").config();
const express = require("express");
const ErrorMiddleware = require("./api/middlewares/error.middleware");

const createApp = () => {
    const app = express();

    app.use(express.json());

    //aqui vão as rotas da api

    app.use(ErrorMiddleware.handle);

    return app;
}

module.exports = createApp;