const express = require("express");
const app = express();

const ErrorMiddleware = require("./src/middlewares/error.middleware");
const UserController = require("./src/api/controllers/user.controller");

const userController = new UserController();

app.use(express.json());

app.get("/users", userController.read);
app.get("/users/:id", userController.readById);
app.post("/users", userController.create);
app.patch("/users/:id", userController.update);
app.delete("/users/:id", userController.delete);

app.use(ErrorMiddleware.handle);

const port = 8080;

app.listen(port, () => {
    (process.env.NODE_ENV === 'debug') && console.log(`Rodando na porta ${port}`);
});