'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 9000,
        firstName: 'Sejin',
        lastName: 'Kim',
        email: 'froydroyce@gmail.com',
        password: bcrypt.hashSync('12345', saltRounds),
        program: 'BE',
        cohort: 1912,
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9001,
        firstName: 'Eric',
        lastName: "O'Neill",
        email: 'oneill.eric23@gmail.com',
        password: bcrypt.hashSync('12345', saltRounds),
        program: 'FE',
        cohort: 1904,
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9002,
        firstName: 'Djavan',
        lastName: "Munroe",
        email: 'djavanm24@gmail.com',
        password: bcrypt.hashSync('12345', saltRounds),
        program: 'FE',
        cohort: 1904,
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9003,
        firstName: 'Aurie',
        lastName: "Gochenour",
        email: 'myrdden@gmail.com',
        password: bcrypt.hashSync('12345', saltRounds),
        program: 'BE',
        cohort: 1912,
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9004,
        firstName: 'Wayne',
        lastName: "Brady",
        email: 'wayneb@turing.io',
        password: bcrypt.hashSync('12345', saltRounds),
        program: 'FE',
        cohort: 1704,
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9005,
        firstName: 'Ian',
        lastName: 'Douglas',
        email: 'iandouglas@turing.io',
        password: bcrypt.hashSync('12345', saltRounds),
        program: 'BE',
        cohort: null,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9006,
        firstName: 'Will',
        lastName: 'Mitchell',
        email: 'willmitchell@turing.io',
        password: bcrypt.hashSync('12345', saltRounds),
        program: 'FE',
        cohort: null,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9007,
        firstName: 'Mockr',
        lastName: 'Admin',
        email: 'mockradmin@turing.io',
        password: bcrypt.hashSync('12345', saltRounds),
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
