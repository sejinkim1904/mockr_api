'use strict';
module.exports = (sequelize, DataTypes) => {
  const Interview = sequelize.define('Interview', {
    score: DataTypes.INTEGER,
    summary: DataTypes.STRING
  }, {});
  Interview.associate = function(models) {
    Interview.belongsToMany(models.User, {
      through: 'InterviewUsers',
      as: 'users',
      foreignKey: 'interviewId'
    })
  };
  return Interview;
};