import express from "express";
import TenantController from "../controllers/tenant.controller.js";

const router = express.Router();
const controller = new TenantController();

/**
 * @swagger
 * /api/tenant:
 *   post:
 *     summary: Cria um tenant
 *     description: Cria um novo tenant com os dados fornecidos
 *     tags:
 *       - [ Tenant ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tenant'
 *     responses:
 *       200:
 *         description: Tenant criado com sucesso.
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
 * /api/tenant:
 *   get:
 *     summary: Obtém todos os tenants
 *     description: Obtém a lista de todos os tenants cadastrados com base nos filtros fornecidos.
 *     tags:
 *       - [ Tenant ]
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
 *         description: Lista de tenants obtida com sucesso.
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
 * /api/tenant/{id}:
 *   get:
 *     summary: Obtém um tenant por ID
 *     description: Obtém um tenant com base no ID fornecido
 *     tags:
 *       - [ Tenant ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tenant a ser obtido
 *     responses:
 *       200:
 *         description: Tenant obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tenant'
 *       404:
 *         description: Tenant não encontrado.
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
 * /api/tenant/{id}:
 *   put:
 *     summary: Atualiza um tenant
 *     description: Atualiza um tenant com os dados fornecidos
 *     tags:
 *       - [ Tenant ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tenant a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tenant'
 *     responses:
 *       200:
 *         description: Tenant atualizado com sucesso.
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
 * /api/tenant/{id}:
 *   delete:
 *     summary: Deleta um tenant por ID
 *     description: Deleta um tenant com base no ID fornecido
 *     tags:
 *       - [ Tenant ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tenant a ser deletado
 *     responses:
 *       200:
 *         description: Tenant deletado com sucesso.
 *       404:
 *         description: Tenant não encontrado.
 *       401:
 *         description: Credenciais de autenticação inválidas.
 *       500:
 *         description: Ocorreu um erro interno na aplicação.
 */
router.delete("/:id", async (req, res, next) => {
    await controller.delete(req, res, next);
});

export default router;