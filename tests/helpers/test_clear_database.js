const Question = require('../../models').Question;
const Interview = require('../../models').Interview;
const InterviewUser = require('../../models').InterviewUser;
const User = require('../../models').User;
const Note = require('../../models').Note;
const UserNote = require('../../models').UserNote;
const InterviewQuestion = require('../../models').InterviewQuestion;

module.exports = async function cleanup() {
  await UserNote.destroy({ where: {} })
  await InterviewQuestion.destroy({ where: {} })
  await Note.destroy({ where: {} })
  await Question.destroy({ where: {} })
  await InterviewUser.destroy({ where: {} })
  await Interview.destroy({ where: {} })
  await User.destroy({ where: {} })
}
