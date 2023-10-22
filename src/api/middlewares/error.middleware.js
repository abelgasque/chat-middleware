const BadRequestException = require("../models/exceptions/bad-request.exception");

class ErrorMiddleware {
    static handle(err, req, res, next) {
        (process.env.NODE_ENV === "debug") && console.error(err.stack);

        if (err.name === 'ValidationError') {
            let messages = [];
            for (let field in err.errors) {
                if (err.errors.hasOwnProperty(field)) {
                    messages.push(err.errors[field].message);
                }
            }
            res.status(400).json({ error: "Erro de validação", messages });
        } else {
            res.status(500).json({ error: "Ocorreu um erro interno na aplicação.", message: err.message, });
        }
    }
}

module.exports = ErrorMiddleware;