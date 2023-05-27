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
    const favorites = await knex("dishes")
    .select([
      "dishes.id",
      "dishes.name",
      "dishes.category",
      "dishes.description",
      "dishes.image",
    ])
    .innerJoin("favorites", "favorites.dish_id", "dishes.id")
    .groupBy("dish_id")
    .where({ user_id })


    return response.status(200).json(favorites);
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { dish_id } = request.params;
    
    // delete favorite dish from database
    await knex("favorites")
      .where({ user_id })
      .andWhere({ dish_id })
      .delete();

    return response.status(200).json();
  }
}

module.exports = FavoritesController;