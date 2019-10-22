const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Question = require('../../models').Question;


describe('Mockr API', () => {
  describe('GraphQL activate question mutation query', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the updated question', async () => {
      let question = await Question.create({
        body: "How does your past experiences help you become a better developer?",
        active: false
      });
      let reqBody = {
        "query": `mutation {
          activateQuestion(id:${question.id}, active: true)
          {id,body,active}
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body.data.activateQuestion)).toContain("id")
          expect(Object.keys(response.body.data.activateQuestion)).toContain("active")
          expect(response.body.data.activateQuestion.active).toBe(true)
        })
    })
  })
})
