const knex = require("../database/knex");

class OrdersAdminController {
  async index(request, response) {
    
    const orders = await knex("order_items")
      .select([
          "orders.id",
          "orders.user_id",
          "orders.order_status",
          "orders.order_amount",
          "orders.payment_method",
          "orders.created_at",
          "orders.created_at",
      ])
      .innerJoin("orders", "orders.id", "order_items.order_id")
      .orderBy("orders.updated_at","desc")

    const ordersItems = await knex("order_items") 
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