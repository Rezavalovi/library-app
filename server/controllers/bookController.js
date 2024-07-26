const { Book, Borrow } = require("../models");
const { Op } = require("sequelize");

class BookController {
  static async getAllBook(req, res, next) {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async borrowBook(req, res, next) {
    const { userId, bookId } = req.body;

    try {
      // Check if user is currently borrowing a book
      const activeBorrow = await Borrow.findOne({
        where: { userId, returnedAt: null },
      });
      if (activeBorrow) {
        return res.status(400).json({
          message: "You must return the current book before borrowing another.",
        });
      }

      // Check if the book is available
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Create a new borrow record
      const borrow = await Borrow.create({
        userId,
        bookId,
        borrowAt: new Date(),
      });
      res.status(201).json(borrow);
    } catch (error) {
      next(error);
    }
  }

  static async returnBook(req, res, next) {
    const { userId, bookId } = req.body;

    try {
      // Find the borrow record
      const borrow = await Borrow.findOne({
        where: { userId, bookId, returnedAt: null },
      });
      if (!borrow) {
        return res.status(404).json({
          message: "No active borrow record found for this user and book.",
        });
      }

      // Update the borrow record to mark as returned
      borrow.returnedAt = new Date();
      await borrow.save();
      res.status(200).json(borrow);
    } catch (error) {
      next(error);
    }
  }

  static async checkLateReturn(req, res, next) {
    const { userId } = req.params;

    try {
      const today = new Date();
      // Set the late return threshold (30 days)
      const lateThreshold = new Date(today.setDate(today.getDate() - 30));

      // Find books borrowed by the user that have not been returned and are past the threshold
      const lateBorrows = await Borrow.findAll({
        where: {
          userId,
          returnedAt: null,
          borrowAt: {
            [Op.lt]: lateThreshold,
          },
        },
      });

      // Find books still borrowed by the user that are within the threshold
      const activeBorrows = await Borrow.findAll({
        where: {
          userId,
          returnedAt: null,
          borrowAt: {
            [Op.gte]: lateThreshold,
          },
        },
      });

      const result = {
        lateBorrows,
        activeBorrows,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
