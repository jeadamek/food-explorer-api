const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const favoritesController = new FavoritesController();

const favoriteRoutes = Router();

favoriteRoutes.use(ensureAuthenticated);

favoriteRoutes.get("/", favoritesController.index);

module.exports = favoriteRoutes;