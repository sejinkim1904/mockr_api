var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const postgraphql = require(`postgraphql`).postgraphql;
const { graphqlExpress, graphiqlExpress } = require(`apollo-server-express`);
const schema  = require('./db/schema');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use(postgraphql('postgres://localhost:5432', 'public', {graphiql: true}));

module.exports = app;
