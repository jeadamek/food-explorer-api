const knex = require("../database/knex");

class OrdersAdminController {
  async index(request, response) {
    
    const orders = await knex("orders")
      .select([
          "orders.id",
          "orders.user_id",
          "orders.order_status",
          "orders.order_amount",
          "orders.payment_method",
          "orders.created_at",
          "orders.created_at",
      ])
      .orderBy("orders.created_at");

    const ordersItems = await knex("order_items") 
      .select([
        "dishes.name",
        "order_items.order_id",
        "order_items.quantity",
        "order_items.unit_price",
      ])
      .innerJoin("dishes", "order_items.dish_id", "dishes.id");

    const ordersWithItems = orders.map(order => {
        const orderItem = ordersItems.filter(item => item.order_id === order.id);

        return {
            ...order,
            items: orderItem
        }
    });
  
    return response.status(200).json(ordersWithItems);
  }

  async update(request, response) {
    const { id, order_status } = request.body;

    await knex("orders").update({
      order_status,
      updated_at: knex.fn.now()
    }).where({ id });

    return response.status(200).json();
  }
}

module.exports = OrdersAdminController;