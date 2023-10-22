const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'O campo primeiro nome é obrigatório.']
    },
    lastName: {
        type: String,
        required: [true, 'O campo sobrenome é obrigatório.']
    },
    email: {
        type: String,
        required: [true, 'O campo e-mail é obrigatório.'],
    },
    password: {
        type: String,
        required: [true, 'O campo senha é obrigatório.'],
        minlength: [7, 'A senha deve ter no mínimo 7 caracteres.']
    },
    active: {
        type: Boolean,
        required: [true, 'O campo ativo é obrigatório.'],
    },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;