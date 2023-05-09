const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.post("/:user_id", ordersController.create);
ordersRoutes.put("/", ordersController.update);
ordersRoutes.get("/", ordersController.index);

module.exports = ordersRoutes;