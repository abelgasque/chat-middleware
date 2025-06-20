import express from "express";
const router = express.Router();

import AuthController from "../controllers/auth.controller.js";
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
router.post("/login", async (req, res, next) => {
    await controller.login(req, res, next);
});

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Atualizar autenticação do usuário
 *     description: Atualizar autenticação do usuário com o token fornecido
 *     tags:
 *       - [ Auth ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshAuth'
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
router.post("/refresh", async (req, res, next) => {
    await controller.refresh(req, res, next);
});

/**
 * @swagger
 * /api/auth/user:
 *   post:
 *     summary: Criar usuário de autenticação
 *     description: Criar usuário inicial para autenticação
 *     tags:
 *       - [ Auth ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       401:
 *         description: Credenciais de autenticação inválidas.
 *       500:
 *         description: Ocorreu um erro interno na aplicação.
 */
router.post("/user", async (req, res, next) => {
    await controller.create(req, res, next);
});

// Exportação no formato ES6
export default router;