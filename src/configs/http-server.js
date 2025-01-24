import express from "express";
import { connectToDatabase } from "../database/connect.js";
import ErrorMiddleware from "../middlewares/error.middleware.js";
import BearerAuthMiddleware from "../middlewares/bearer-auth.middleware.js";
import swaggerRoutes from "../api/routes/swagger.routes.js";
import healthRoutes from "../api/routes/health.routes.js";
import userRoutes from "../api/routes/user.routes.js";
import authRoutes from "../api/routes/auth.routes.js";

const createApp = () => {
    const app = express();
    app.use(express.json());
    
    connectToDatabase();
    const authMiddleware = new BearerAuthMiddleware();

    app.use("/", swaggerRoutes);
    app.use("/api/health", healthRoutes);
    app.use("/api/user", authMiddleware.authenticate, userRoutes);
    app.use("/api/auth", authRoutes);

    app.use(ErrorMiddleware.handle);

    return app;
};

export default createApp;