const Question = require('../models').Question;
const Sequelize = require('sequelize');

module.exports = {
  getQuestions: () => {
    return Question.findAll()
  },

  createQuestion: ({body}) => {
    console.log(body)
    return Question.create({body: body})
  }
};
