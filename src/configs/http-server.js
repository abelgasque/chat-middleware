import express from "express";
import cors from "cors";
import { connectToDatabase } from "../database/connect.js";
import ErrorMiddleware from "../middlewares/error.middleware.js";
import BearerAuthMiddleware from "../middlewares/bearer-auth.middleware.js";
import swaggerRoutes from "../api/routes/swagger.routes.js";
import healthRoutes from "../api/routes/health.routes.js";
import userRoutes from "../api/routes/user.routes.js";
import tenantRoutes from "../api/routes/tenant.routes.js";
import supersetRoutes from "../api/routes/superset.routes.js";
import authRoutes from "../api/routes/auth.routes.js";

const allowedOrigins = process.env.CORS_ORIGINS.split(',');

const createApp = () => {
    const app = express();

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    }));

    app.use(express.json());

    connectToDatabase();
    const authMiddleware = new BearerAuthMiddleware();

    app.use("/", swaggerRoutes);
    app.use("/api/health", healthRoutes);
    app.use("/api/user", authMiddleware.authenticate, userRoutes);
    app.use("/api/tenant", authMiddleware.authenticate, tenantRoutes);
    app.use("/api/superset", authMiddleware.authenticate, supersetRoutes);
    app.use("/api/auth", authRoutes);

    app.use(ErrorMiddleware.handle);

    return app;
};

export default createApp;   