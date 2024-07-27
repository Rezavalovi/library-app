const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw { name: "InvalidToken" };
    }

    if (token.slice(0, 7) !== "Bearer ") {
      throw { name: "InvalidToken" };
    }

    token = token.slice(7);
    let payload = verifyToken(token);

    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "InvalidToken" };
    }
    
    req.user = {
      id: user.id,
      role: user.role
    };
    next();
  } catch (error) {
    console.error(error.message); 
    if (error.name === "InvalidToken") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
