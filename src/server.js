require("dotenv").config();
const express = require("express");
const ErrorMiddleware = require("./api/middlewares/error.middleware");

const createApp = () => {
    const connectToDatabase = require("./database/connect");
    connectToDatabase();

    const app = express();

    const swaggerRoutes = require("./routes/swagger.routes");
    const healthRoutes = require("./routes/health.routes");
    const userRoutes = require("./routes/user.routes");

    app.use(express.json());

    app.use("/", swaggerRoutes);
    app.use("/api/health", healthRoutes);
    app.use("/api/user", userRoutes);

    app.use(ErrorMiddleware.handle);

    return app;
}

module.exports = createApp;