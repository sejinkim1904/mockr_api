'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 9000,
        firstName: 'Wayne',
        lastName: 'Brady',
        email: 'waynebrady@turing.io',
        password: '12345',
        program: 'BE',
        cohort: 1904,
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9001,
        firstName: 'Drew',
        lastName: 'Carey',
        email: 'drewcarey@turing.io',
        password: '12345',
        program: 'FE',
        cohort: 1904,
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9002,
        firstName: 'Ian',
        lastName: 'Douglas',
        email: 'iandouglas@turing.io',
        password: '12345',
        program: 'BE',
        cohort: null,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9003,
        firstName: 'Will',
        lastName: 'Mitchell',
        email: 'willmitchell@turing.io',
        password: '12345',
        program: 'FE',
        cohort: null,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9004,
        firstName: 'Mockr',
        lastName: 'Admin',
        email: 'mockradmin@turing.io',
        password: '12345',
        program: null,
        cohort: null,
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', null, {});
  }
};
