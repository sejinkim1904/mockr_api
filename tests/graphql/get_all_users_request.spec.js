const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const User = require('../../models').User;

describe('Mockr API', () => {
  describe('All questions GET request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns a list of all questions', async () => {
      await User.create({
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'bobbarker@turing.io',
        password: '12345',
        program: 'BE',
        cohort: 1904,
        role: 0
      });
      await User.create({
        firstName: 'Jack',
        lastName: 'Nicholson',
        email: 'jacknicholson@turing.io',
        password: '12345',
        program: 'FE',
        cohort: 1906,
        role: 1
      });

      let reqBody1 = {
        "query": `query {
          users(role: 0)
          {
            id
            firstName
            lastName
            email
            role
            program
            cohort
          }
        }`
      };

      let reqBody2 = {
        "query": `query {
          users
          {
            id,
            firstName
            lastName
            email
            role
            program
            cohort
          }
        }`
      };

      request(app)
        .post('/graphql')
        .send(reqBody1)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.data.users.length).toBe(1)
          expect(Object.keys(response.body.data.users[0])).toContain("id")
          expect(Object.keys(response.body.data.users[0])).toContain("firstName")
          expect(Object.keys(response.body.data.users[0])).toContain("lastName")
          expect(Object.keys(response.body.data.users[0])).toContain("email")
          expect(Object.keys(response.body.data.users[0])).toContain("role")
          expect(Object.keys(response.body.data.users[0])).toContain("program")
          expect(Object.keys(response.body.data.users[0])).toContain("cohort")
        })

      return request(app)
        .post('/graphql')
        .send(reqBody2)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.data.users.length).toBe(2)
          expect(Object.keys(response.body.data.users[0])).toContain("id")
          expect(Object.keys(response.body.data.users[0])).toContain("firstName")
          expect(Object.keys(response.body.data.users[0])).toContain("lastName")
          expect(Object.keys(response.body.data.users[0])).toContain("email")
          expect(Object.keys(response.body.data.users[0])).toContain("role")
          expect(Object.keys(response.body.data.users[0])).toContain("program")
          expect(Object.keys(response.body.data.users[0])).toContain("cohort")
        })
    })
  })
})
