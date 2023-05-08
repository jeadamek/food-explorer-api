const { Router } = require("express");

const usersRouter = require("./users.routes");
const ordersRouter = require("./orders.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/orders", ordersRouter);
// routes.use("/dishes", dishesRouter);
// routes.use("/favorites", favoritesRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;