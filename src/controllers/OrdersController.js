const knex = require("../database/knex");

class OrderController {
  async create(request, response) {
    const { cart, order_amount, payment_method } = request.body;
    const user_id = request.user.id;

    // add order to database
    const [order_id] = await knex("orders").insert({
      user_id,
      order_amount,
      payment_method
    });

    // add order's items to database
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
    const user_id = request.user.id;

    const userOrders = await knex("orders").where({ user_id })
      .select([
        "orders.id",
        "orders.user_id",
        "orders.order_status",
        "orders.order_amount",
        "orders.payment_method",
        "orders.created_at",
        "orders.updated_at",
      ])
      .innerJoin("order_items", "orders.id", "order_items.order_id")
      .groupBy("order_id")
      .orderBy("orders.created_at","desc")

    const ordersItems = await knex("order_items");
    const ordersWithItems = userOrders.map(order => {
      const orderItems = ordersItems.filter(item => item.order_id === order.id);

      return {
        ...order,
        items: orderItems
      }
    });
  
    return response.status(200).json(ordersWithItems);
  }
}

module.exports = OrderController;