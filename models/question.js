'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    body: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Question.associate = function(models) {
    Question.hasMany(models.Note, {
      foreignKey: 'questionId',
      as: 'notes'
    })
    Question.belongsToMany(models.Interview, {
      through: 'InterviewQuestions',
      as: 'interviews',
      foreignKey: 'questionId'
    })
  };
  return Question;
};
