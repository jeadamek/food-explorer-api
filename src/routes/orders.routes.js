const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");

const ordersRoutes = Router();
const orderController = new OrdersController;

ordersRoutes.post("/:user_id", orderController.create);
ordersRoutes.put("/", orderController.update);
ordersRoutes.get("/", orderController.index);

module.exports = ordersRoutes;