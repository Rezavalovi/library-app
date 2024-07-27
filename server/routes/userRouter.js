const UserController = require("../controllers/userController");
const userRouter = require("express").Router();
const authenticate = require("../middlewares/authentication");

userRouter.get("/admin/users", authenticate, UserController.getUsers);
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

module.exports = userRouter;
