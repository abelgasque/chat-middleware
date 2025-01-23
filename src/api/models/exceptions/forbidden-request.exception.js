class ForbiddenRequestException extends Error {
    constructor(error, messages) {
        super();
        this.name = 'ForbiddenRequestException';
        this.error = error;
        this.messages = messages;
    }

    getErrorObject() {
        return { error: this.error, messages: this.messages };
    }
}

export default ForbiddenRequestException;