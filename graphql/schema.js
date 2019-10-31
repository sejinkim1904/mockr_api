var { buildSchema } = require('graphql')

module.exports = buildSchema(`
  scalar Date
  type Question {
    id: Int
    body: String
    active: Boolean
    notes: Note
  },
  type Interview {
    id: Int
    score: Int
    summary: String
    users: [User]
    notes: [Note]
    questions: [Question]
    createdAt: Date
    updatedAt: Date
  },
  type Note {
    id: Int
    body: String
    score: Int
    users: [User]
    interview: Interview
    question: Question
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
    interviews: [Interview]
  },
  type Query {
    questions(
      id: Int
      body: String
      active: Boolean
    ): [Question]
    user(
      id: Int!
    ): User!
    login(
      email: String!
      password: String!
    ): User
    users(
      role: Int
    ): [User]
    randomQuestions(
      id: Int
    ): [Question]
    interview(
      id: Int!
    ): Interview
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
    addNote(
      body: String!
      score: Int!
      studentId: Int!
      interviewerId: Int!
      questionId: Int!
      interviewId: Int!
    ): Note!
    updateNote(
      id: Int!
      score: Int
      body: String
    ): Note!
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      passwordConfirmation: String!
      program: String
      cohort: Int
    ): User
  }
`)
