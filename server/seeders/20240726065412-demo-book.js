'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataBooks = require("../data/books.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Books", dataBooks, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {})
  }
};