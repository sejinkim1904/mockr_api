const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql')

const indexRouter = require('./routes/index');
const schema  = require('./graphql/schema');
const { getQuestions, createQuestion } = require('./graphql/resolvers.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const root = {
  questions: getQuestions,
  addQuestion: createQuestion
}
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

module.exports = app;
