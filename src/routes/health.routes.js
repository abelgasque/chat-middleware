const express = require("express");
const router = express.Router();

const HealthController = require("../api/controllers/health.controller");
const controller = new HealthController();

router.get("/", async function (req, res, next) {
    await controller.get(req, res, next);
});

module.exports = router;