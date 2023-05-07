const { Router } = require("express");

const usersRouter = require("./users.routes");
const ordersRouter = require("./orders.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/orders", ordersRouter);

module.exports = routes;