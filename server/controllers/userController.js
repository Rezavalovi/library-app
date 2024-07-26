const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
class UserController {
  static async register(req, res, next) {
    const { email, password, role } = req.body;

    // Validasi email domain
    const validDomains = ["gmail.com", "hotmail.com", "yahoo.com"];
    const domain = email.split("@")[1];
    if (!validDomains.includes(domain)) {
      return res.status(400).json({ message: "Invalid email domain" });
    }

    // Validasi password
    if (password.length < 8 || password.length > 64) {
      return res
        .status(400)
        .json({ message: "Password must be between 8 and 64 characters long" });
    }
    if (!/^[a-zA-Z0-9]*$/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password can only contain alphanumeric characters" });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }
    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one lowercase letter",
      });
    }
    if (!/[0-9]/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    try {
      const hashedPassword = hashPassword(password);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        role,
      });
      res
        .status(201)
        .json({ id: newUser.id, email: newUser.email, role: newUser.role });
    } catch (error) {
        next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token, id: user.id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
