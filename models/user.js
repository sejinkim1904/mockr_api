'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    program: DataTypes.STRING,
    cohort: DataTypes.INTEGER,
    role: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Interview, {
      through: 'InterviewUsers',
      as: 'interviews',
      foreignKey: 'userId'
    })
    User.belongsToMany(models.Note, {
      through: 'UserNotes',
      as: 'notes',
      foreignKey: 'userId'
    })
  };
  return User;
};
