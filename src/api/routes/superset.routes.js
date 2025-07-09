import express from "express";
import SupersetController from "../controllers/superset.controller.js";

const router = express.Router();
const controller = new SupersetController();

router.get("/", async (req, res, next) => {
    await controller.guestToken(req, res, next);
});

export default router;