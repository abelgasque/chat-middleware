const UserService = require("../services/user.service");
const userService = new UserService();

class UserController {

  create = async (req, res, next) => {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const users = await userService.read();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  readById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await userService.readById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await userService.update(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await userService.delete(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

}

module.exports = UserController;
