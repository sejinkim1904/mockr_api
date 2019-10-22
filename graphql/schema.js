var { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Question {
    id: Int
    body: String
    active: Boolean
  },
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
  }
`)
