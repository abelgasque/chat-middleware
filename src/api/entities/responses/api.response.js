class ApiResponse {
  constructor(status = 200, message = 'OK', data = null, error = null) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success(message = 'Sucesso', data = null) {
    return new ApiResponse(200, message, data);
  }

  static created(message = 'Criado com sucesso', data = null) {
    return new ApiResponse(201, message, data);
  }

  static deleted(message = 'Excluido com sucesso', data = null) {
    return new ApiResponse(201, message, data);
  }

  static badRequest(message = 'Requisição inválida', error = null) {
    return new ApiResponse(400, message, null, error);
  }

  static notFound(message = 'Não encontrado') {
    return new ApiResponse(404, message);
  }

  static serverError(message = 'Erro interno do servidor', error = null) {
    return new ApiResponse(500, message, null, error);
  }
}

export default ApiResponse;