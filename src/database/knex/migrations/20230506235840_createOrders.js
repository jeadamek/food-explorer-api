exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id").primary();
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");

  table.text("orderStatus");
  table.decimal("orderAmount", 6, 2);
  table.text("paymentMethod");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
