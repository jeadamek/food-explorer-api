const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const OrdersAdminController = require("../controllers/OrdersAdminController");
const ensureAuthenticatedUser = require("../middleware/ensureAuthenticatedUser");
const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticadedAdmin");


const ordersController = new OrdersController();
const ordersAdminController = new OrdersAdminController();

const ordersRoutes = Router();

// ADMIN ROUTES
ordersRoutes.put("/admin", ensureAuthenticatedAdmin, ordersAdminController.update);
ordersRoutes.get("/admin", ensureAuthenticatedAdmin, ordersAdminController.index);

// CLIENT ROUTES
ordersRoutes.post("/", ensureAuthenticatedUser, ordersController.create);
ordersRoutes.get("/", ensureAuthenticatedUser, ordersController.index);

module.exports = ordersRoutes;