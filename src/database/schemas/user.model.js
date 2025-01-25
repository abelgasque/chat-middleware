import { DataTypes } from 'sequelize';
import { sequelize } from '../connect.js';

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "O campo primeiro nome é obrigatório.",
            },
            notEmpty: {
                msg: "O campo primeiro nome é obrigatório.",
            },
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "O campo sobrenome é obrigatório.",
            },
            notEmpty: {
                msg: "O campo sobrenome é obrigatório.",
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "E-mail já cadastrado",
        },
        validate: {
            notNull: {
                msg: "O campo e-mail é obrigatório.",
            },
            notEmpty: {
                msg: "O campo e-mail é obrigatório.",
            },
            isEmail: {
                msg: "O campo e-mail deve ser um e-mail válido.",
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "O campo senha é obrigatório.",
            },
            notEmpty: {
                msg: "O campo senha é obrigatório.",
            },
            len: {
                args: [4],
                msg: "A senha deve ter no mínimo 4 caracteres.",
            },
        },
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "O campo ativo é obrigatório.",
            },
            notEmpty: {
                msg: "O campo ativo é obrigatório.",
            },
        },
    },
}, {
    timestamps: true,
});

export default User;