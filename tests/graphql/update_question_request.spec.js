const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Question = require('../../models').Question;


describe('Mockr API', () => {
  describe('GraphQL update question mutation query', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the updated question', async () => {
      let question = await Question.create({
        body: "How does your past experiences help you become a better developer?",
      });
      let body = "Do you like writing tests?"
      let reqBody = {
        "query": `mutation {
          updateQuestionBody(id:${question.id}, body: "${body}")
          {id,body,active}
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body.data.updateQuestionBody)).toContain("id")
          expect(Object.keys(response.body.data.updateQuestionBody)).toContain("active")
          expect(response.body.data.updateQuestionBody.body).toBe("Do you like writing tests?")
        })
    })
  })
})
