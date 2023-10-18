class ErrorMiddleware {
    static handle(err, req, res, next) {
        (process.env.NODE_ENV === 'debug') && console.error(err.stack);
        res.status(500).json({
            error: "Ocorreu um erro interno na aplicação.",
            message: err.message,
        });
    }
}

module.exports = ErrorMiddleware;