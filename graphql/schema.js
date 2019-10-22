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
  }
`)
