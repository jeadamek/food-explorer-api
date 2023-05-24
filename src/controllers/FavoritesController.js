const knex = require("../database/knex");

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id;
    const {dish_id} = request.body;

    await knex("favorites").insert({
      user_id,
      dish_id
    });

    return response.status(201).json();
  }


  async index(request, response) {
    const user_id = request.user.id;

    // select the user's favorites dishes
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


    return response.status(200).json(favorites);
  }
}

module.exports = FavoritesController;