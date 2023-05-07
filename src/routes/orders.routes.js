const { Router } = require("express");
const OrderController = require("../controllers/OrderController");

const ordersRoutes = Router();
const orderController = new OrderController;

ordersRoutes.post("/:user_id", orderController.create);
ordersRoutes.put("/", orderController.update);

module.exports = ordersRoutes;