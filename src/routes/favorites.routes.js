const { Router } = require("express");
const FavoritesController = require("../controllers/FavoritesController");

const favoritesController = new FavoritesController();

const favoriteRoutes = Router();

favoriteRoutes.get("/:user_id", favoritesController.index);

module.exports = favoriteRoutes;