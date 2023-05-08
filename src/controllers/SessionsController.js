const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    // authenticate user's register
    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail ou senha incorreta", 401);
    }

    // authenticate user's password
    const passwordMatches = compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError("E-mail ou senha incorreta", 401);
    }

    // create token

    return response.json(user);
  }
}

module.exports = SessionsController;