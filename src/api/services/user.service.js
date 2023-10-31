const UserModel = require("../models/schemas/user.model");
const BadRequestException = require("../models/exceptions/bad-request.exception");
const NotFoundRequestException = require("../models/exceptions/not-found-request.exception");

class UserService {

    async create(data) {
        const findByEmail = await this.readByEmail(data.email);
        if (findByEmail) {
            throw new BadRequestException("E-mail já cadastrado");
        }

        return await UserModel.create(data);
    }

    async read(filters) {
        const { firstName, lastName, email, active } = filters;
        const filterObject = {};
        if (firstName) filterObject.firstName = firstName;
        if (lastName) filterObject.lastName = lastName;
        if (email) filterObject.email = email;
        if (active !== undefined) filterObject.active = active;

        return await UserModel.find(filterObject);
    }

    async readById(id) {
        const findById = await UserModel.findById(id);
        if (!findById) {
            throw new NotFoundRequestException("Usuário não encontrado");
        }

        return findById;
    }

    async readByEmailAndPassword(email, password) {
        return await UserModel.findOne({ email, password });
    }

    async readByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async update(id, data) {
        const findById = await this.readById(id);
        if (!findById) {
            throw new NotFoundRequestException("Usuário não encontrado");
        }

        if (findById.email != data?.email) {
            const findByEmail = await this.readByEmail(data.email);
            if (findByEmail && findByEmail._id != findById._id) {
                throw new BadRequestException("E-mail já cadastrado");
            }
        }

        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        const findById = await UserModel.findById(id);
        if (!findById) {
            throw new NotFoundRequestException("Usuário não encontrado");
        }

        await UserModel.findByIdAndRemove(id);
    }
}

module.exports = UserService;