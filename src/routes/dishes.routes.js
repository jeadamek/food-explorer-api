const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticated");


const dishesController = new DishesController();

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);


dishesRoutes.post("/", ensureAuthenticatedAdmin, upload.single("image"), dishesController.create);
dishesRoutes.put("/:id", ensureAuthenticatedAdmin, upload.single("image"), dishesController.update);
dishesRoutes.get("/admin", ensureAuthenticatedAdmin, dishesController.index);
dishesRoutes.get("/admin/:id", ensureAuthenticatedAdmin, dishesController.show);
dishesRoutes.delete("/:id", ensureAuthenticatedAdmin, dishesController.delete);

dishesRoutes.get("/", ensureAuthenticated, dishesController.index);
dishesRoutes.get("/:id", ensureAuthenticated, dishesController.show);

module.exports = dishesRoutes;