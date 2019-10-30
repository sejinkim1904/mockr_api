const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const indexRouter = require('./routes/index');
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
  createSession
} = require('./graphql/resolvers.js');


const app = express();
const FormatError = require('easygraphql-format-error');
const formatError = new FormatError([
  {
    name: 'INVALID_EMAIL',
    message: 'The email or password is not valid',
    statusCode: '400'
  },
  {
    name: 'INVALID_PASSWORD',
    message: 'The email or password is not valid',
    statusCode: '400'
  }
]);
const errorName = formatError.errorName;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
  login: createSession
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
