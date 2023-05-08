const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");

const ordersRoutes = Router();
const ordersController = new OrdersController;

ordersRoutes.post("/:user_id", ordersController.create);
ordersRoutes.put("/", ordersController.update);
ordersRoutes.get("/", ordersController.index);

module.exports = ordersRoutes;