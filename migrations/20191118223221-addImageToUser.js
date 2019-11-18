'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Users",
      "image",
      {
        type: Sequelize.STRING,
        defaultValue: "https://sleepy-sierra-43686.herokuapp.com/static/media/profile.a1a1be24.jpg",
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Users",
      "image"
    )
  }
};
