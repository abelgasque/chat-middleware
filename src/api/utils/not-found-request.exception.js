class NotFoundRequestException extends Error {
    constructor(error, messages) {
        super();
        this.name = 'NotFoundRequestException';
        this.error = error;
        this.messages = messages;
    }

    getErrorObject() {
        return { error: this.error, messages: this.messages };
    }
}

export default NotFoundRequestException;