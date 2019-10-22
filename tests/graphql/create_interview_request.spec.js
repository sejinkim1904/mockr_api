const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Interview = require('../../models').Interview;
const User = require('../../models').User;

describe('Mockr API', () => {
  describe('Create interview POST request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the created question', async () => {
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
      let reqBody = {
        "query": `mutation {
          addInterview(studentId:${student.id}, interviewerId:${interviewer.id})
          {
            id,
            score,
            summary,
            users {
              id,
              firstName,
              lastName,
              email,
              program, 
              cohort,
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
          expect(Object.keys(response.body.data.addInterview)).toContain("id")
          expect(Object.keys(response.body.data.addInterview)).toContain("score")
          expect(Object.keys(response.body.data.addInterview)).toContain("summary")
          expect(Object.keys(response.body.data.addInterview)).toContain("users")
          expect(response.body.data.addInterview.users.length).toEqual(2)
        })
    })
  })
})
