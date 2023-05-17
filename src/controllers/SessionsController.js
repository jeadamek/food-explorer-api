const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/authUser");
const authConfigAdmin = require("../configs/authAdmin");

const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    // authenticate user's register
    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail ou senha incorreta", 401);
    }

    // authenticate user's password
    const passwordMatches = await compare(password, user.password);
    
    if (!passwordMatches) {
      throw new AppError("E-mail ou senha incorreta", 401);
    }

    // create user token
    if (user.isAdmin) {
      const { secret, expiresIn } = authConfigAdmin.jwt

      const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn
      });

      return response.json({ user, token });

    } else {
      const { secret, expiresIn } = authConfig.jwt

      const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn
      });

      return response.json({ user, token });
    }
  }
}

module.exports = SessionsController;