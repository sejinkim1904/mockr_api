'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Users",
      "image",
      {
        type: Sequelize.STRING,
        defaultValue: "https://github.com/eoneill23/mockr/blob/master/src/images/profile.jpg?raw=true",
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
