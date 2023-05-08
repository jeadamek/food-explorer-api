const knex = require("../database/knex");

class FavoritesController {
  async index(request, response) {
    const { user_id } = request.params;

    const favorites = await knex("favorites")
    .select([
      "dishes.title",
      "dishes.category",
      "dishes.description",
      "dishes.image",
    ])
    .innerJoin("dishes", "favorites.dish_id", "dishes.id")
    .groupBy("dish_id")
    .where({ user_id })


    return response.json(favorites);
  }
}

module.exports = FavoritesController;