const Question = require('../models').Question;
const Interview = require('../models').Interview;
const InterviewUser = require('../models').InterviewUser;
const User = require('../models').User;
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
  },

  updateActive: ({id, active}) => {
    return Question.update(
      { active },
      { returning: true, where: { id }}
    )
    .then(updatedQuestion => {
      return updatedQuestion[1][0]
    })
  },

  createInterview: async ({studentId, interviewerId}) => {
    return await Interview.create()
      .then(async interview => {
        await InterviewUser.create({
          interviewId: interview.id,
          userId: studentId
        })
        await InterviewUser.create({
          interviewId: interview.id,
          userId: interviewerId
        })
        return interview;
      })
      .then(interview => {
        return Interview.findOne({
          where: { id: interview.id },
          include: [{
            model: User,
            as: 'users',
            through: {
              attributes: []
            }
          }]
        })
      })
  }
};
