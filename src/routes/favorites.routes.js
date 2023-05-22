const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthenticatedUser = require("../middleware/ensureAuthenticatedUser");

const favoritesController = new FavoritesController();

const favoriteRoutes = Router();

favoriteRoutes.use(ensureAuthenticatedUser);

favoriteRoutes.get("/", favoritesController.index);

module.exports = favoriteRoutes;