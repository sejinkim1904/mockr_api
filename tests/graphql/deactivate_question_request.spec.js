const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Question = require('../../models').Question;


describe('Mockr API', () => {
  describe('GraphQL deactivate question mutation query', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the updated question', async () => {
      let question = await Question.create({
        body: "How does your past experiences help you become a better developer?",
      });
      let reqBody = {
        "query": `mutation {
          deactivateQuestion(id:${question.id}, active: false)
          {id,body,active}
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          console.log(response.body)
          expect(Object.keys(response.body.data.deactivateQuestion)).toContain("id")
          expect(Object.keys(response.body.data.deactivateQuestion)).toContain("active")
          expect(response.body.data.deactivateQuestion.active).toBe(false)
        })
    })
  })
})
