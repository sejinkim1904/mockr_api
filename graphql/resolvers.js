const Question = require('../models').Question;
const Interview = require('../models').Interview;
const InterviewUser = require('../models').InterviewUser;
const User = require('../models').User;
const UserNote = require('../models').UserNote;
const Note = require('../models').Note;
const Sequelize = require('sequelize');

module.exports = {
  getQuestions: () => {
    return Question.findAll()
  },

  getRandomQuestions: () => {
    return Question.findAll({
      order: [
        [Sequelize.fn('RANDOM')]
      ]
    })
  },

  createQuestion: ({body}) => {
    return Question.create( { body } )
  },

  updateBody: ({id, body}) => {
    return Question.update(
      { body },
      { returning: true, where: { id } }
    )
      .then(updatedQuestion => {
        return updatedQuestion[1][0]
      })
  },

  updateActive: ({id, active}) => {
    return Question.update(
      { active },
      { returning: true, where: { id } }
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
  },

  getInterview: ({ id }) => {
    return Interview.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'users',
          through: {
            attributes: []
          }
        },
        {
          model: Note,
          as: 'notes',
          include: [{
            model: Question,
            as: 'question'
          }]
        }
      ]
    })
  },

  updateInterview: ({id, score, summary}) => {
    return Interview.update(
      { score, summary },
      { returning: true, where: { id } }
    )
      .then(updatedInterview => {
        return updatedInterview[1][0]
      })
  },

  createNote: async ({
    body,
    score,
    studentId,
    interviewerId,
    questionId,
    interviewId
  }) => {
    return await Note.create(
      { body, score, questionId, interviewId }
    )
      .then(async note => {
        await UserNote.create({
          noteId: note.id,
          userId: studentId
        });
        await UserNote.create({
          noteId: note.id,
          userId: interviewerId
        });
        return note;
      })
        .then(note => {
          return Note.findOne({
            where: { id: note.id },
            include: [
              {
                model: User,
                as: 'users',
                through: {
                  attributes: []
                }
              },
              {
                model: Question,
                as: 'question',
              },
              {
                model: Interview,
                as: 'interview'
              }
            ]
          });
        });
  },

  editNote: ({ id, score, body }) => {
    return Note.update(
      { score, body },
      {returning: true, where: { id } },
    )
      .then(updatedNote => {
        return updatedNote[1][0]
      })
  },

  getUser: async ({ id }) => {
    return await User.findOne({
      where: { id },
      include: [{
        model: Interview,
        as: 'interviews',
        include: [
          {
            model: User,
            as: 'users',
          },
          {
            model: Note,
            as: 'notes',
            include: [{
              model: Question,
              as: 'question'
            }]
          },
          {
            model: Question,
            as: 'questions',
            include: [{
              model: Note,
              as: 'notes'
            }]
          }
        ],
        through: {
          attributes: []
        }
      }]
    }
    )
  },

  getUsers: ({role}) => {
    if(role === undefined) {
      return User.findAll();
    }
    return User.findAll({
      where: { role }
    });
  }
};
