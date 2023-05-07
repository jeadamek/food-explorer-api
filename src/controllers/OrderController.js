const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrderController {
  async create(request, response) {
    const { cart, order_amount, payment_method } = request.body;
    const { user_id } = request.params;

    const [order_id] = await knex("orders").insert({
      user_id,
      order_amount,
      payment_method
    });

    const itemsInsert = cart.map(item => {
      return {
        dish_id: item.dish_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        order_id
      }
    });

    await knex("order_items").insert(itemsInsert);
    
    return response.status(201).json();
  }

  async index(request, response) {
    
  }

  async update(request, response) {
    const { id, order_status } = request.body;

    await knex("orders").update({
      order_status,
      updated_at: knex.fn.now()
    }).where({ id });

    return response.status(201).json();
  }
}

module.exports = OrderController;