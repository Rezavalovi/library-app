require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { errorHandler, sendError } = require("./middlewares/errorHandler");
const router = require("./routes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`SERVER CONNECTED!`);
});

module.exports = app;