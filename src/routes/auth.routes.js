const express = require("express");
const router = express.Router();

const AuthController = require("../api/controllers/auth.controller");
const controller = new AuthController();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Autentica um usuário com os dados fornecidos
 *     tags:
 *       - [ Auth ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       401:
 *         description: Credenciais de autenticação inválidas.
 *       500:
 *         description: Ocorreu um erro interno na aplicação.
 */
router.post("/login", async function (req, res, next) {
    await controller.login(req, res, next);
});

module.exports = router;