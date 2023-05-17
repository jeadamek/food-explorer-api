const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const OrdersAdminController = require("../controllers/OrdersAdminController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticadedAdmin");


const ordersController = new OrdersController();
const ordersAdminController = new OrdersAdminController();

const ordersRoutes = Router();


ordersRoutes.put("/admin", ensureAuthenticatedAdmin, ordersAdminController.update);
ordersRoutes.get("/admin", ensureAuthenticatedAdmin, ordersAdminController.index);

ordersRoutes.post("/", ensureAuthenticated, ordersController.create);
ordersRoutes.get("/", ensureAuthenticated, ordersController.index);

module.exports = ordersRoutes;