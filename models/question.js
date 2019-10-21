'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    body: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};
