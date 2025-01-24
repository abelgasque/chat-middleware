class UnauthorizedRequestException extends Error {
    constructor(error, messages) {
        super();
        this.name = 'UnauthorizedRequestException';
        this.error = error;
        this.messages = messages;
    }

    getErrorObject() {
        return { error: this.error, messages: this.messages };
    }
}

export default UnauthorizedRequestException;