const errorMap = {
    BadRequestException: { status: 400 },
    UnauthorizedRequestException: { status: 401 },
    ForbiddenRequestException: { status: 403 },
    NotFoundRequestException: { status: 404 }
};

class ErrorMiddleware {
    static handle(err, req, res, next) {
        (process.env.NODE_ENV === "development") && console.error(err.stack);

        if (err.name === 'ValidationError') {
            let messages = [];
            for (let field in err.errors) {
                if (err.errors.hasOwnProperty(field)) {
                    messages.push(err.errors[field].message);
                }
            }
            res.status(400).json({ error: "Erro de validação", messages });
        }
        else if (errorMap[err.name]) {
            const { status } = errorMap[err.name];
            res.status(status).json(err.getErrorObject());
        }
        else {
            res.status(500).json({ error: "Ocorreu um erro interno na aplicação.", message: err.message, });
        }
    }
}

module.exports = ErrorMiddleware;