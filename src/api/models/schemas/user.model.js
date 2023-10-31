const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "O campo primeiro nome é obrigatório."]
    },
    lastName: {
        type: String,
        required: [true, "O campo sobrenome é obrigatório."]
    },
    email: {
        type: String,
        index: true,
        required: [true, "O campo e-mail é obrigatório."],
        unique: [true, "E-mail já cadastrado"]
    },
    password: {
        type: String,
        required: [true, "O campo senha é obrigatório."],
        minlength: [4, "A senha deve ter no mínimo 4 caracteres."]
    },
    active: {
        type: Boolean,
        required: [true, "O campo ativo é obrigatório."],
    },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;