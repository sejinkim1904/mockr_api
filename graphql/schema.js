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
    notes: [Note]
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
  type InterviewQuestion {
    id: Int
    interview: Interview
    question: Question
    skipped: Boolean
  }
  type Query {
    questions(
      id: Int
      body: String
      active: Boolean
    ): [Question]
    user(
      id: Int!
    ): User!
    users(
      role: Int
    ): [User]
    randomQuestions(
      id: Int
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
    addNote(
      body: String!
      score: Int!
      studentId: Int!
      interviewerId: Int!
      questionId: Int!
      interviewId: Int!
    ): Note!
    addQuestionToInterview(
      questionId: Int!
      interviewId: Int!
      skipped: Boolean
    ): InterviewQuestion!
  }
`)
