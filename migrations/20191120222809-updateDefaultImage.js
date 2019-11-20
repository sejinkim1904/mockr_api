'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      "Users",
      {
        image: "https://github.com/eoneill23/mockr/blob/master/src/images/profile.jpg?raw=true",
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Users",
      "image"
    )
  }
};
