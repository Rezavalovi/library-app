const bookRouter = require("./bookRouter");
const userRouter = require("./userRouter");

const router = require("express").Router();

router.use("/", userRouter);
router.use("/", bookRouter);

module.exports = router;
