const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');

describe('Mockr API', () => {
  describe('addUser query request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the created user', async () => {
      let reqBody1 = {
        "query": `mutation {
          addUser(
            firstName: "Sejin"
            lastName: "Kim"
            email: "sejthewedge@gmail.com"
            password: "password"
            passwordConfirmation: "password"
            program: "BE"
            cohort: 1904
          ) {
            id
            firstName
            lastName
            email
            program
            cohort
            role
          }
        }`
      };

      let reqBody2 = {
        "query": `mutation {
          addUser(
            firstName: "Sejin"
            lastName: "Kim"
            email: "sejthewedge@gmail.com"
            password: "password"
            passwordConfirmation: "pasdsword"
            program: "BE"
            cohort: 1904
          ) {
            id
            firstName
            lastName
            email
            program
            cohort
            role
          }
        }`
      };

      let reqBody3 = {
        "query": `mutation {
          addUser(
            firstName: "Sejin"
            lastName: "Kim"
            email: "sejthewedgegmail.com"
            password: "password"
            passwordConfirmation: "pasdsword"
            program: "BE"
            cohort: 1904
          ) {
            id
            firstName
            lastName
            email
            program
            cohort
            role
          }
        }`
      };

      await request(app)
        .post('/graphql')
        .send(reqBody1)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body.data.addUser)).toContain("id")
          expect(Object.keys(response.body.data.addUser)).toContain("firstName")
          expect(Object.keys(response.body.data.addUser)).toContain("lastName")
          expect(Object.keys(response.body.data.addUser)).toContain("email")
          expect(Object.keys(response.body.data.addUser)).toContain("program")
          expect(Object.keys(response.body.data.addUser)).toContain("cohort")
          expect(Object.keys(response.body.data.addUser)).toContain("role")
        })

      await request(app)
        .post('/graphql')
        .send(reqBody2)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body)).toContain("errors")
          expect(Object.keys(response.body.errors[0])).toContain("message")
        })

      await request(app)
        .post('/graphql')
        .send(reqBody3)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body)).toContain("errors")
          expect(Object.keys(response.body.errors[0])).toContain("message")
        })

      return await request(app)
        .post('/graphql')
        .send(reqBody1)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body)).toContain("errors")
          expect(Object.keys(response.body.errors[0])).toContain("message")
        })
    })
  })
})
