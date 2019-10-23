'use strict';
module.exports = (sequelize, DataTypes) => {
  const InterviewQuestion = sequelize.define('InterviewQuestion', {
    interviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Interviews',
        key: 'id'
      }
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'id'
      }
    },
    skipped: DataTypes.BOOLEAN
  }, {});
  InterviewQuestion.associate = function(models) {
    InterviewQuestion.belongsTo(models.Question, {
      as: 'question',
      foreignKey: 'questionId'
    })
    InterviewQuestion.belongsTo(models.Interview, {
      as: 'interview',
      foreignKey: 'interviewId'
    })
  };
  return InterviewQuestion;
};
