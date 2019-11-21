const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const User = require('../../models').User

describe('Mockr API', () => {
  describe('updateUser mutation query request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the created user', async () => {
      let bob = await User.create({
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'bobbarker@turing.io',
        password: '12345',
        program: 'BE',
        cohort: 1904,
        role: 0
      });
      await User.create({
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'a@a.com',
        password: '12345',
        program: 'BE',
        cohort: 1904,
        role: 0
      });

      let reqBody = {
        "query": `mutation {
          updateUser(
            id: ${bob.id}
            firstName: "Sejin"
            lastName: "Kim"
            email: "sejthewedge@gmail.com"
            password: "password"
            passwordConfirmation: "password"
            program: "FE"
            cohort: 1906
            role: 1
            roleRequest: 1
          ) {
            id
            firstName
            lastName
            email
            program
            cohort
            role
            roleRequest
          }
        }`
      };

      let reqBody1 = {
        "query": `mutation {
          updateUser(
            id: ${bob.id}
            firstName: "Sejin"
            lastName: "Kim"
            email: "sejthewedge@gmail.com"
            password: "passwor"
            passwordConfirmation: "password"
            program: "FE"
            cohort: 1906
            role: 1
            roleRequest: 1
          ) {
            id
            firstName
            lastName
            email
            program
            cohort
            role
            roleRequest
          }
        }`
      };

      let reqBody2 = {
        "query": `mutation {
          updateUser(
            id: ${bob.id}
            firstName: "Sejin"
            lastName: "Kim"
            email: "a@a.com"
            password: "password"
            passwordConfirmation: "password"
            program: "FE"
            cohort: 1906
            role: 1
            roleRequest: 1
          ) {
            id
            firstName
            lastName
            email
            program
            cohort
            role
            roleRequest
          }
        }`
      };

      let reqBody3 = {
        "query": `mutation {
          updateUser(
            id: ${bob.id}
            firstName: "Sejin"
            lastName: "Kim"
            email: "bobbarkerturing.io"
            password: "password"
            passwordConfirmation: "password"
            program: "FE"
            cohort: 1906
            role: 1
            roleRequest: 1
          ) {
            id
            firstName
            lastName
            email
            program
            cohort
            role
            roleRequest
          }
        }`
      };

      await request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.data.updateUser.firstName).toBe("Sejin")
          expect(response.body.data.updateUser.lastName).toBe("Kim")
          expect(response.body.data.updateUser.email).toBe("sejthewedge@gmail.com")
          expect(response.body.data.updateUser.program).toBe("FE")
          expect(response.body.data.updateUser.cohort).toBe(1906)
          expect(response.body.data.updateUser.role).toBe(1)
          expect(response.body.data.updateUser.roleRequest).toBe(1)
        })

      await request(app)
        .post('/graphql')
        .send(reqBody1)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body)).toContain("errors")
          expect(Object.keys(response.body.errors[0])).toContain("message")
        })

      await request(app)
        .post('/graphql')
        .send(reqBody2)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body)).toContain("errors")
          expect(Object.keys(response.body.errors[0])).toContain("message")
        })

      return await request(app)
        .post('/graphql')
        .send(reqBody3)
        .then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body)).toContain("errors")
          expect(Object.keys(response.body.errors[0])).toContain("message")
        })
    })
  })
})
