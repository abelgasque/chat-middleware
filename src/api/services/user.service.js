import User from "../../database/schemas/user.model.js";
import BadRequestException from "../utils/bad-request.exception.js";
import NotFoundRequestException from "../utils/not-found-request.exception.js";

class UserService {
    async create(data) {
        const findByEmail = await this.readByEmail(data.email);
        if (findByEmail) {
            throw new BadRequestException("E-mail já cadastrado");
        }
        return await User.create(data);
    }

    async read(params) {
        const { firstName, lastName, email, active } = params;
        const filters = {};

        if (firstName) filters.firstName = firstName;
        if (lastName) filters.lastName = lastName;
        if (email) filters.email = email;
        if (active !== undefined) filters.active = active;

        return await User.findAll({ where: filters });
    }

    async readById(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundRequestException("Usuário não encontrado");
        }
        return user;
    }

    async readByEmailAndPassword(email, password) {
        return await User.findOne({ where: { email } });
    }

    async readByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async update(id, data) {
        const user = await this.readById(id);
        if (user.email !== data?.email) {
            const findByEmail = await this.readByEmail(data.email);
            if (findByEmail && findByEmail.id !== user.id) {
                throw new BadRequestException("E-mail já cadastrado");
            }
        }
        return await user.update(data);
    }

    async delete(id) {
        const user = await this.readById(id);
        await user.destroy();
    }
}

export default UserService;