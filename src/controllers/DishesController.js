const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(request, response) {
    // get request's information
    const { name, description, category, price, ingredients } = request.body;
    const dishImage = request.file.filename;

    const diskStorage = new DiskStorage();

    // validate dish
    const checkIfDishExists = await knex("dishes").where({ name }).first();

    if (checkIfDishExists) {
      throw new AppError("Este prato já está registrado");
    }

    const filename = await diskStorage.saveFile(dishImage);
    
    // add dish to database
    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      category,
      price,
      image: filename
    });

    // add ingredients to database
    const insertIngredients = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id
      }
    });

    await knex("ingredients").insert(insertIngredients);

    return response.status(201).json();
  }

  async update(request, response) {
    // get new information
    const { name, description, category, price, ingredients } = request.body;
    const { id } = request.params;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não existe");
    }

    // check if there is other dish with the new name
    const checkIfDishExists = await knex("dishes").where({ name }).first()

    if (checkIfDishExists && checkIfDishExists.id !== dish.id) {
      throw new AppError("O nome deste prato já consta no menu");
    }

    // check if there is a image for this 
    if(imageFilename){
      await diskStorage.deleteFile(dish.image);
    }
    
    const filename = await diskStorage.saveFile(imageFilename);
    
    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;
    dish.price = price ?? dish.price;
    dish.image = filename ?? dish.image;

    await knex("dishes").update(dish).where({ id });

    // update ingredients
    if (ingredients) {
      const insertIngredients = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id: dish.id
        }
      })
    
      // delete all ingredients from database and insert new ingredients
      await knex("ingredients").where({ dish_id: dish.id }).delete();
      await knex("ingredients").where({ dish_id: dish.id }).insert(insertIngredients);
    }

    return response.status(200).json("Prato atualizado com sucesso");
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id}).orderBy("name");

    return response.status(200).json({
      ...dish,
      ingredients
    });
  }

  async index(request, response) {
    const { name, ingredients } = request.query;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());
      
      dishes = await knex("ingredients")
        .select([ 
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image"
        ])
        .innerJoin("dishes", "ingredients.dish_id", "dishes.id")
        .whereIn("ingredients.name", filterIngredients)
        .andWhereLike("dishes.name", `%${name}%`)
        .groupBy("dish_id")
        .orderBy("dishes.name")

    } else {
      dishes = await knex("dishes")
        .whereLike("dishes.name", `%${name}%`)
        .orderBy("name");
    }

    // select dish ingredients, and return dish with ingredients
    const dishesIngredients = await knex("Ingredients");
    const dishWithIngredients = dishes.map(dish => {
      const dishIngredients = dishesIngredients.filter(ingredient => ingredient.dish_id === dish.id)

      return {
        ...dish,
        dishIngredients
      }
    })


    return response.json(dishWithIngredients);
  }

  async delete(request, response) {
    const { id } = request.params;

    const diskStorage = new DiskStorage();
    
    // delete image from files
    const [dish] = await knex("dishes").where({ id });
    await diskStorage.deleteFile(dish.image);

    // delete dish from database
    await knex("dishes").where({ id }).delete();

    return response.status(200).json();
  }
}

module.exports = DishesController;