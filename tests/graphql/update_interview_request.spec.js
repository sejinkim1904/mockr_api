const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const Interview = require('../../models').Interview;
const InterviewUser = require('../../models').InterviewUser;
const User = require('../../models').User;

describe('Mockr API', () => {
  describe('Update interview POST request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns the updated question', async () => {
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
      let interview = await Interview.create({
        score: null,
        summary: null,
      })
      await InterviewUser.create({
        interviewId: interview.id,
        userId: student.id
      })
      await InterviewUser.create({
        interviewId: interview.id,
        userId: interviewer.id
      })
      let reqBody = {
        "query": `mutation {
          finalizeInterview(id: ${interview.id}, score: 5, summary: "great job")
          {
            id,
            score,
            summary,
          }
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          console.log(response.body)
          expect(Object.keys(response.body.data.finalizeInterview)).toContain("id")
          expect(response.body.data.finalizeInterview.score).toBe(5)
          expect(response.body.data.finalizeInterview.summary).toContain("great job")
        })
    })
  })
})
