import express from "express";
import SupersetController from "../controllers/superset.controller.js";

const router = express.Router();
const controller = new SupersetController();

/**
 * @swagger
 * /api/superset/guest_token:
 *   post:
 *     summary: Autentica usuário convidado
 *     description: Autentica um usuário convidado com os dados padrão do servidor
 *     tags:
 *       - [ Superset ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
router.post("/guest_token", async (req, res, next) => {
    await controller.guestToken(req, res, next);
});

export default router;