const Question = require('../models').Question;
const Sequelize = require('sequelize');

module.exports = {
  getQuestions: () => {
    return Question.findAll()
  },

  createQuestion: ({body}) => {
    return Question.create({body: body})
  },

  updateBody: ({id, body}) => {
    return Question.update(
      { body },
      { returning: true, where: { id }}
    )
    .then(updatedQuestion => {
      return updatedQuestion[1][0]
    })
  }
};
