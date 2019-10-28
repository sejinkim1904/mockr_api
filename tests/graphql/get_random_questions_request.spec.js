const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Question = require('../../models').Question;

describe('Mockr API', () => {
  describe('All questions in random order request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns a list of random questions', async () => {
      await Question.create({
        body: "How does your past experiences help you become a better developer?",
      });

      await Question.create({
        body: "How do you approach TDD?",
      });

      await Question.create({
        body: "What is your favorite framework?",
      });

      let reqBody = {
        "query": `query {
          randomQuestions
          {
            id
            body
            active
          }
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.data.randomQuestions.length).toBe(3)
          expect(Object.keys(response.body.data.randomQuestions[0])).toContain("id")
          expect(Object.keys(response.body.data.randomQuestions[0])).toContain("body")
          expect(Object.keys(response.body.data.randomQuestions[0])).toContain("active")
        })
    })
  })
})
