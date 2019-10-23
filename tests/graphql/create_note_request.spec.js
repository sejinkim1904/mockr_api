const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Interview = require('../../models').Interview;
const Question = require('../../models').Question;
const InterviewUser = require('../../models').InterviewUser;
const User = require('../../models').User;

describe('Mockr API', () => {
  describe('Create note POST request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the created note', async () => {
      let student = await User.create({
        firstName: 'Wayne',
        lastName: 'Brady',
        email: 'waynebrady@turing.io',
        password: '12345',
        program: 'BE',
        cohort: 1904,
        role: 0
      })
      let interviewer = await User.create({
        firstName: 'Ian',
        lastName: 'Douglas',
        email: 'iandouglas@turing.io',
        password: '12345',
        program: 'BE',
        cohort: 1801,
        role: 1
      })
      let interview = await Interview.create({
        score: null,
        summary: null,
      })
      let question = await Question.create({
        body: "Is this a question?"
      })

      let reqBody = {
        "query": `mutation {
          addNote(
            body: "You answered this great",
            score: 5,
            studentId: ${student.id},
            interviewerId: ${interviewer.id},
            questionId: ${question.id},
            interviewId: ${interview.id}
          )
          {
            id,
            body,
            score,
            interview {
              id
            }
            question {
              id,
              body
            }
            users {
              id,
              firstName,
              lastName,
              role
            }
          }
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body.data.addNote)).toContain("id")
          expect(Object.keys(response.body.data.addNote)).toContain("body")
          expect(Object.keys(response.body.data.addNote)).toContain("score")
          expect(Object.keys(response.body.data.addNote)).toContain("interview")
          expect(Object.keys(response.body.data.addNote)).toContain("question")
          expect(Object.keys(response.body.data.addNote)).toContain("users")
          expect(response.body.data.addNote.users.length).toBe(2)
        })
    })
  })
})
