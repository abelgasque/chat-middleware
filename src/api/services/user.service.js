const UserModel = require("../models/schemas/user.model");

class UserService {

    async create(data) {
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
        return await UserModel.findById(id);
    }

    async readByEmailAndPassword(email, password) {
        return await UserModel.findOne({ email, password });
    }

    readByEmail(email) {
        return UserModel.findOne({ email });
    }

    async update(id, data) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await UserModel.findByIdAndRemove(id);
    }
}

module.exports = UserService;