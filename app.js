require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const indexRouter = require('./routes/index');
const oauthRouter = require('./routes/oauth')
const schema  = require('./graphql/schema');
const {
  getQuestions,
  createQuestion,
  updateBody,
  updateActive,
  createInterview,
  updateInterview,
  createNote,
  getUser,
  getUsers,
  getRandomQuestions,
  editNote,
  getInterview,
  createSession,
  createUser,
  editUser,
  oauthUser
} = require('./graphql/resolvers.js');

const app = express();
const FormatError = require('easygraphql-format-error');
const formatError = new FormatError();
const errorName = formatError.errorName;
const passport = require('passport');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/oauth', oauthRouter)

const root = {
  questions: getQuestions,
  addQuestion: createQuestion,
  updateQuestionBody: updateBody,
  deactivateQuestion: updateActive,
  activateQuestion: updateActive,
  addInterview: createInterview,
  finalizeInterview: updateInterview,
  addNote: createNote,
  user: getUser,
  users: getUsers,
  randomQuestions: getRandomQuestions,
  updateNote: editNote,
  interview: getInterview,
  login: createSession,
  addUser: createUser,
  updateUser: editUser,
  currentUser: oauthUser
}
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  context: { errorName },
  customFormatErrorFn: (err) => {
    return formatError.getError(err)
  }
}));

module.exports = app;
