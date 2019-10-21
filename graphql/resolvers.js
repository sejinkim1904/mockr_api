const Question = require('../models').Question;
const Sequelize = require('sequelize');

module.exports = {
  getQuestions: () => {
    console.log("is this working")
    return Question.findAll()
  }
};
