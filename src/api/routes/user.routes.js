import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();
const controller = new UserController();

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Cria um usuário
 *     description: Cria um novo usuário com os dados fornecidos
 *     tags:
 *       - [ User ]
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
router.post("/", async (req, res, next) => {
    await controller.create(req, res, next);
});

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtém todos os usuários
 *     description: Obtém a lista de todos os usuários cadastrados com base nos filtros fornecidos.
 *     tags:
 *       - [ User ]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filtrar por primeiro nome.
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filtrar por sobrenome.
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar por e-mail.
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filtrar por status ativo.
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso.
 *       401:
 *         description: Credenciais de autenticação inválidas.
 *       500:
 *         description: Ocorreu um erro interno na aplicação.
 */
router.get("/", async (req, res, next) => {
    await controller.read(req, res, next);
});

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtém um usuário por ID
 *     description: Obtém um usuário com base no ID fornecido
 *     tags:
 *       - [ User ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser obtido
 *     responses:
 *       200:
 *         description: Usuário obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado.
 *       401:
 *         description: Credenciais de autenticação inválidas.
 *       500:
 *         description: Ocorreu um erro interno na aplicação.
 */
router.get("/:id", async (req, res, next) => {
    await controller.readById(req, res, next);
});

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza um usuário com os dados fornecidos
 *     tags:
 *       - [ User ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       401:
 *         description: Credenciais de autenticação inválidas.
 *       500:
 *         description: Ocorreu um erro interno na aplicação.
 */
router.put("/:id", async (req, res, next) => {
    await controller.update(req, res, next);
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Deleta um usuário por ID
 *     description: Deleta um usuário com base no ID fornecido
 *     tags:
 *       - [ User ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       401:
 *         description: Credenciais de autenticação inválidas.
 *       500:
 *         description: Ocorreu um erro interno na aplicação.
 */
router.delete("/:id", async (req, res, next) => {
    await controller.delete(req, res, next);
});

export default router;