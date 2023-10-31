class BadRequestException extends Error {
    constructor(error, messages) {
        super();
        this.name = 'BadRequestException';
        this.error = error;
        this.messages = messages;
    }

    getErrorObject() {
        return { error: this.error, messages: this.messages };
    }
}

module.exports = BadRequestException;