const { Router } = require("express");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticadedAdmin");

const userController = new UserController();

const usersRoutes = Router();

usersRoutes.post('/', userController.create);
usersRoutes.put("/", ensureAuthenticatedAdmin, userController.update);

module.exports = usersRoutes;