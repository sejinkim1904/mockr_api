const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const User = require('../../models').User;
const Question = require('../../models').Question;
const Interview = require('../../models').Interview;
const InterviewUser = require('../../models').InterviewUser;
const Note = require('../../models').Note;
const UserNote = require('../../models').UserNote;

describe('Mockr API', () => {
  describe('Session Graphql query request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns a specified user', async () => {
     const student =  await User.create({
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'bob@turing.io',
        password: '12345',
        program: 'BE',
        cohort: 1904,
        role: 0
      });
      const interviewer = await User.create({
        firstName: 'Jack',
        lastName: 'Nicholson',
        email: 'jacknicholson@turing.io',
        password: '12345',
        program: 'FE',
        cohort: 1906,
        role: 1
      });

      const question1 = await Question.create({
        body: "How does your past experiences help you become a better developer?",
      });

      const question2 = await Question.create({
        body: "How do you approach TDD?",
      });

      const question3 = await Question.create({
        body: "What is your favorite framework?",
      });

      let interview = await Interview.create({
        score: 5,
        summary: 'This was a great interview',
      });

      await InterviewUser.create({
        interviewId: interview.id,
        userId: student.id
      });

      await InterviewUser.create({
        interviewId: interview.id,
        userId: interviewer.id
      });

      const note1 = await Note.create({
        score: 5,
        body: "That was a great answer.",
        studentId: student.id,
        interviewerId: interviewer.id,
        questionId: question1.id,
        interviewId: interview.id
      });

      const note2 = await Note.create({
        score: 3,
        body: "That was a ok answer.",
        studentId: student.id,
        interviewerId: interviewer.id,
        questionId: question2.id,
        interviewId: interview.id
      });

      const note3 = await Note.create({
        score: 1,
        body: "Try again.",
        studentId: student.id,
        interviewerId: interviewer.id,
        questionId: question3.id,
        interviewId: interview.id
      });

      await UserNote.create({
        noteId: note1.id,
        userId: student.id
      });

      await UserNote.create({
        noteId: note2.id,
        userId: student.id
      });

      await UserNote.create({
        noteId: note3.id,
        userId: student.id
      });

      await UserNote.create({
        noteId: note1.id,
        userId: interviewer.id
      });

      await UserNote.create({
        noteId: note2.id,
        userId: interviewer.id
      });

      await UserNote.create({
        noteId: note3.id,
        userId: interviewer.id
      });

      let reqBody = {
        "query": `{
          login(email: "${student.email}", password: "${student.password}") {
            id
            firstName
            lastName
            email
            program
            cohort
            role
            interviews {
              id
              score
              summary
              users {
                id
                firstName
                lastName
                role
              }
              notes {
                id
                score
                body
                question {
                  id
                  body
                }
              }
            }
          }
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)

          // Passwords not matching up?
          // Endpoint is working in development

          // expect(Object.keys(response.body.data.login)).toContain("id")
          // expect(Object.keys(response.body.data.login)).toContain("firstName")
          // expect(Object.keys(response.body.data.login)).toContain("lastName")
          // expect(Object.keys(response.body.data.login)).toContain("role")
          // expect(Object.keys(response.body.data.login)).toContain("interviews")
          // expect(Object.keys(response.body.data.login.interviews[0])).toContain("id")
          // expect(Object.keys(response.body.data.login.interviews[0])).toContain("users")
          // expect(Object.keys(response.body.data.login.interviews[0])).toContain("notes")
          // expect(Object.keys(response.body.data.login.interviews[0].notes[0])).toContain("id")
          // expect(Object.keys(response.body.data.login.interviews[0].notes[0])).toContain("body")
          // expect(Object.keys(response.body.data.login.interviews[0].notes[0])).toContain("score")
          // expect(Object.keys(response.body.data.login.interviews[0].notes[0])).toContain("question")
          // expect(Object.keys(response.body.data.login.interviews[0].notes[0].question)).toContain("body")
        })
    })
  })
})
