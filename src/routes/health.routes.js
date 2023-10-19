const express = require("express");
const router = express.Router();

const HealthController = require("../api/controllers/health.controller");
const controller = new HealthController();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verificar o status da aplicação
 *     description: Esta rota verifica o status da aplicação e retorna uma mensagem.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Sucesso. A aplicação está em execução.
 *       401:
 *         description: Credenciais de autenticação inválidas.
 *       500:
 *         description: Ocorreu um erro interno na aplicação.
 */
router.get("/", async function (req, res, next) {
    await controller.get(req, res, next);
});

module.exports = router;