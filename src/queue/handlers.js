import UserService from "../api/services/user.service.js";

const userService = new UserService();

export function handlers(type, payload) {
  switch (type) {
    case "user.created":
      console.log("📩 Criar usuário com payload:", payload);
      return userService.create(payload);
    case "user.updated":
      console.log("✏️ Atualizar usuário com payload:", payload);
      return userService.update(payload.id, payload.body);
    case "user.deleted":
      console.log("🗑️ Excluir usuário com id:", payload.id);
      return userService.delete(payload.id);
    default:
      console.warn(`⚠️ Handler não encontrado para tipo: ${type}`);
      throw new Error(`Handler não encontrado para tipo: ${type}`);
  }
}