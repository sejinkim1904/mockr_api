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
      return request(app)
        .get('/graphql?mutation={addQuestion(body:"Do you like making tests?")}}')
        .then(response => {
          console.log(response.body)
          expect(response.status).toBe(201)
          expect(response.body.data.questions.length).toBe(1)
          expect(Object.keys(response.body.data.questions[0])).toContain("id")
          expect(Object.keys(response.body.data.questions[0])).toContain("body")
          expect(Object.keys(response.body.data.questions[0])).toContain("active")
        })
    })
  })
})
