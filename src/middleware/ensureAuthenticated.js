const ensureAuthenticatedUser = require("../middleware/ensureAuthenticatedUser");
const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticadedAdmin");

function ensureAuthenticated(request, response, next) {
  try {
    ensureAuthenticatedUser(request, response, () => {
      // If the user is authenticated as a client, call the next middleware
      next();
    });
  } catch {
    ensureAuthenticatedAdmin(request, response, () => {
      // If the user is authenticated as an administrator, call the next middleware
      next();
    });
  }
}


module.exports = ensureAuthenticated;
