const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios');
const Question = require('../models').Question;
const Interview = require('../models').Interview;
const InterviewUser = require('../models').InterviewUser;
const User = require('../models').User;
const UserNote = require('../models').UserNote;
const Note = require('../models').Note;
const Sequelize = require('sequelize');
const FormatError = require('easygraphql-format-error');
const formatError = new FormatError([
  {
    name: 'INVALID_EMAIL',
    message: 'The email or password is not valid',
    statusCode: '400'
  },
  {
    name: 'INVALID_PASSWORD',
    message: 'Passwords do not match.',
    statusCode: '400'
  },
  {
    name: 'EMAIL_TAKEN',
    message: 'That email is already in use.',
    statusCode: '400'
  },
  {
    name: 'EMAIL_FORMAT',
    message: 'Invalid email format.',
    statusCode: '400'
  },
]);
const errorName = formatError.errorName;

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
      { returning: true, where: { id } },
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
    })
  },

  createSession: async ({ email, password }) => {
    return await User.findOne({
      where: { email },
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
    })
      .then(async user => {
        if (!user) {
          throw new Error(errorName.INVALID_EMAIL);
        }

        const valid =  await bcrypt.compare(password, user.password)

        if (!valid) {
          throw new Error(errorName.INVALID_EMAIL)
        }
        return user
      })
  },

  getUsers: ({ role, roleRequest }) => {
    if (roleRequest) {
      return User.findAll({
        where: { roleRequest }
      })
    }

    if(role === undefined) {
      return User.findAll();
    }

    return User.findAll({
      where: { role },
      include: [{
        model: Note,
        as: 'notes',
        include: [{
          model: Question,
          as: 'question'
        }]
      }]
    });
  },

  createUser: async ({
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    program,
    cohort
  }) => {
    return await User.findOne({
      where: { email }
    })
      .then(async user => {
        if (user) {
          throw await new Error(errorName.EMAIL_TAKEN)
        }

        let emailFormat = /\S+@\S+/;

        if (!emailFormat.test(email)) {
          throw await new Error(errorName.EMAIL_FORMAT)
        }

        if (password !== passwordConfirmation) {
          throw await new Error(errorName.INVALID_PASSWORD)
        }

        return await User.create(
          { firstName, lastName, email, program, cohort },
          { password: bcrypt.hashSync(password, saltRounds) }
        )
      })
  },

  editUser: async ({
    id,
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    program,
    cohort,
    role,
    roleRequest
  }) => {
    if (email) {
      let emailFormat = /\S+@\S+/;
      let user = await User.findOne({
        where: { email }
      })

      if (user) {
        throw await new Error(errorName.EMAIL_TAKEN)
      }

      if (!emailFormat.test(email)) {
        throw await new Error(errorName.EMAIL_FORMAT)
      }
    }

    if (password !== passwordConfirmation) {
      throw new Error(errorName.INVALID_PASSWORD)
    }

    if (password) {
      await User.update(
        { password: bcrypt.hashSync(password, saltRounds) },
        { returning: true, where: { id } },
      )
    }

    return await User.update(
      {
        firstName,
        lastName,
        email,
        program,
        cohort,
        role,
        roleRequest
      },
      { returning: true, where: { id } },
    )
      .then(updatedUser => {
        return updatedUser[1][0]
      })
  },

  oauthUser: async ({token}) => {
    return await axios.get(`https://api.github.com/user?access_token=${token}`)
      .then(async response => {
        const profile = response.data
        const fullName = profile.name.split(" ")

        return await User.findOrCreate({
          where: {
            email: profile.email,
            firstName: fullName[0],
            lastName: fullName[1],
            image: profile.avatar_url
          }
        })
          .then(user => {
            return user[0]
          })
      })
  }
};
