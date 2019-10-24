const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Question = require('../../models').Question;
const Interview = require('../../models').Interview;

describe('Mockr API', () => {
  describe('Create question GET request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the created question', async () => {
      let interview = await Interview.create({
        score: null,
        summary: null,
      });
      let question = await Question.create({
        body: "How does your past experiences help you become a better developer?",
      });

      let reqBody = {
        "query": `mutation {
          addQuestionToInterview(
            interviewId: ${interview.id},
            questionId: ${question.id},
            skipped: true
          ) {
              id
              interview {
                id
              }
              question {
                id
                body
              }
              skipped
            }
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body.data.addQuestionToInterview)).toContain("id")
          expect(Object.keys(response.body.data.addQuestionToInterview)).toContain("interview")
          expect(Object.keys(response.body.data.addQuestionToInterview)).toContain("question")
          expect(Object.keys(response.body.data.addQuestionToInterview)).toContain("skipped")
        })
    })
  })
})
