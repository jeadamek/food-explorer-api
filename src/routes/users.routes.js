const { Router } = require("express");

const UserController = require("../controllers/UserController");
const ensureAuthenticatedUser = require("../middleware/ensureAuthenticatedUser");
// const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticadedAdmin");

const userController = new UserController();

const usersRoutes = Router();

usersRoutes.post('/', userController.create);
usersRoutes.put("/", ensureAuthenticatedUser, userController.update);

module.exports = usersRoutes;