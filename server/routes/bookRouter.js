const express = require("express");
const BookController = require("../controllers/bookController");
const authentication = require("../middlewares/authentication");

const router = express.Router();

// Route untuk mendapatkan semua buku
router.get("/books", authentication, BookController.getAllBook);

// Route untuk memeriksa keterlambatan pengembalian buku
router.get(
  "/check-late/:userId",
  authentication,
  BookController.checkLateReturn,
);

// Route untuk meminjam buku
router.post("/borrow", authentication, BookController.borrowBook);

// Route untuk mengembalikan buku
router.post("/return", authentication, BookController.returnBook);



module.exports = router;
