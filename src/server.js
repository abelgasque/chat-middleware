require("dotenv").config();
const express = require("express");
const { connectToDatabase } = require("./database/connect");
const ErrorMiddleware = require("./api/middlewares/error.middleware");
const BearerAuthMiddleware = require("./api/middlewares/bearer-auth.middleware");

const createApp = () => {
    connectToDatabase();

    const app = express();

    const authMiddleware = new BearerAuthMiddleware();

    const swaggerRoutes = require("./routes/swagger.routes");
    const healthRoutes = require("./routes/health.routes");
    const userRoutes = require("./routes/user.routes");
    const authRoutes = require("./routes/auth.routes");

    app.use(express.json());

    app.use("/", swaggerRoutes);
    app.use("/api/health", healthRoutes);
    app.use("/api/user", authMiddleware.authenticate, userRoutes);
    app.use("/api/auth", authRoutes);

    app.use(ErrorMiddleware.handle);

    return app;
}

module.exports = createApp;