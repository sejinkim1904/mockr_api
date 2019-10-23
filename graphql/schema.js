var { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Question {
    id: Int
    body: String
    active: Boolean
  },
  type Interview {
    id: Int
    score: Int
    summary: String
    users: [User]
  },
  type User {
    id: Int
    firstName: String
    lastName: String
    email: String
    password: String
    program: String
    cohort: Int
    role: Int
  }
  type Query {
    questions(
      id: Int
      body: String
      active: Boolean
    ): [Question]
  },
  type Mutation {
    addQuestion(
      id: Int
      body: String!
      active: Boolean
    ): Question!
    updateQuestionBody(
      id: Int!
      body: String!
    ): Question
    deactivateQuestion(
      id: Int!
      active: Boolean!
    ): Question
    activateQuestion(
      id: Int!
      active: Boolean!
    ): Question
    addInterview(
      studentId: Int!
      interviewerId: Int!
    ): Interview!
    finalizeInterview(
      id: Int!
      score: Int!
      summary: String!
    ): Interview!
  }
`)
