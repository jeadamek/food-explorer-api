const { Router } = require("express");
const FavoritesController = require("../controllers/FavoritesController");

const favoriteRoutes = Router();
const favoritesController = new FavoritesController;

favoriteRoutes.get("/:user_id", favoritesController.index);

module.exports = favoriteRoutes;