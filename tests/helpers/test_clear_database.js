const Question = require('../../models').Question;
const Interview = require('../../models').Interview;
const InterviewUser = require('../../models').InterviewUser;
const User = require('../../models').User;

module.exports = async function cleanup() {
  await Question.destroy({ where: {} })
  await InterviewUser.destroy({ where: {} })
  await Interview.destroy({ where: {} })
  await User.destroy({ where: {} })
}
