const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Question = require('../../models').Question;

describe('Mockr API', () => {
  describe('Create question GET request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the created question', async () => {
      let body = "Do you like writing tests?"
      let reqBody = {
        "query": `mutation {
          addQuestion(body: "${body}")
          {id,body,active}
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body.data.addQuestion)).toContain("id")
          expect(Object.keys(response.body.data.addQuestion)).toContain("body")
          expect(Object.keys(response.body.data.addQuestion)).toContain("active")
        })
    })
  })
})
