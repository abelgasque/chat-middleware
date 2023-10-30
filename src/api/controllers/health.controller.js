const port = process.env.NODE_PORT || 9090;

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Rotas de verificação de status da aplicação
 */
class HealthController {
    get = async (req, res, next) => {
        return res.status(200).json({ success: true, message: `Aplicação executando na porta: ${port}` });
    }
}

module.exports = HealthController;