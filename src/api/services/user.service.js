const UserModel = require("../models/user.model");

class UserService {

    async create(data) {
        return await UserModel.create(data);
    }

    async read() {
        return await UserModel.find({});
    }

    async readById(id) {
        return await UserModel.findById(id);
    }

    async update(id, data) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await UserModel.findByIdAndRemove(id);
    }
}

module.exports = UserService;