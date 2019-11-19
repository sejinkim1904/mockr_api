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
const mockAxios = require('axios');
const githubResponse = require("../../__fixtures__/github_response");

describe('Mockr API', () => {
  describe('currentUser Graphql query request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns a user by findOrCreate', async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve(githubResponse)
      );
      const student =  await User.create({
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'bobbarker@turing.io',
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
          currentUser(token: "1c1ee3b6cb1ac486393b070f48d1ac090aa75dd4") {
            id
            firstName
            lastName
            email
            program
            cohort
            role
            image
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
          console.log(response.body)
          expect(response.status).toBe(200)
          expect(Object.keys(response.body.data.currentUser)).toContain("id")
          expect(Object.keys(response.body.data.currentUser)).toContain("firstName")
          expect(Object.keys(response.body.data.currentUser)).toContain("lastName")
          expect(Object.keys(response.body.data.currentUser)).toContain("email")
          expect(Object.keys(response.body.data.currentUser)).toContain("program")
          expect(Object.keys(response.body.data.currentUser)).toContain("cohort")
          expect(Object.keys(response.body.data.currentUser)).toContain("role")
          expect(Object.keys(response.body.data.currentUser)).toContain("image")
          expect(Object.keys(response.body.data.currentUser)).toContain("interviews")
        })
    })
  })
})
