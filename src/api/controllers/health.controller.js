const port = process.env.NODE_PORT || 9090;

class HealthController {
    get = async (req, res, next) => {
        res.status(200).json({ success: true, message: `Aplicação executando na porta: ${port}` });
    }
}

module.exports = HealthController;