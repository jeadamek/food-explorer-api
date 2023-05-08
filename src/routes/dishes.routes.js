const { Router } = require("express");
const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();
const dishesController = new DishesController;

dishesRoutes.post("/", dishesController.create);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;