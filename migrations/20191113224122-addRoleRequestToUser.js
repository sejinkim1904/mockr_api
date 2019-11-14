'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Users",
      "roleRequest",
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Users",
      "roleRequest"
    )
  }
};
