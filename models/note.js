'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    body: DataTypes.STRING,
    score: DataTypes.INTEGER,
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
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.Question, {
      as: 'question',
      foreignKey: 'questionId'
    })
    Note.belongsTo(models.Interview, {
      as: 'interview',
      foreignKey: 'interviewId'
    })
    Note.belongsToMany(models.User, {
      through: 'UserNotes',
      as: 'users',
      foreignKey: 'noteId'
    })
  };
  return Note;
};
