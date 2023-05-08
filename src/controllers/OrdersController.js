const knex = require("../database/knex");

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
    const { user_id } = request.query;
    const admin = true;
    
    let ordersWithItems;
  
    if (!admin) {
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
      .groupBy("orders.id")
      .orderBy("orders.updated_at","desc")
  
      const ordersItems = await knex("order_items");
      ordersWithItems = userOrders.map(order => {
        const orderItems = ordersItems.filter(item => item.order_id === order.id);
  
        return {
          ...order,
          items: orderItems
        }
      });
    
    } else {
      const orders = await knex("order_items")
      .select([
          "orders.id",
          "orders.user_id",
          "orders.order_status",
          "orders.order_amount",
          "orders.payment_method",
          "orders.created_at",
          "orders.updated_at",
      ])
      .innerJoin("orders", "orders.id", "order_items.order_id")
      .groupBy("orders.id")
      .orderBy("orders.updated_at","desc")
  
      const ordersItems = await knex("order_items") 
      ordersWithItems = orders.map(order => {
          const orderItem = ordersItems.filter(item => item.order_id === order.id);
  
          return {
              ...order,
              items: orderItem
          }
      });
    }
  
    return response.status(200).json(ordersWithItems);
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