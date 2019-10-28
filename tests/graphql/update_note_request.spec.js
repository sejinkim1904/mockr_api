const shell = require('shelljs');
const request = require('supertest');
const app = require('../../app');
const cleanup = require('../helpers/test_clear_database');
const User = require('../../models').User;
const Question = require('../../models').Question;
const Interview = require('../../models').Interview;
const InterviewUser = require('../../models').InterviewUser;
const Note = require('../../models').Note;
const UserNote = require('../../models').UserNote;
const InterviewQuestion = require('../../models').InterviewQuestion;

describe('Mockr API', () => {
  describe('updateNote mutation request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns updated note', async () => {
      const student =  await User.create({
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'bobbarker@turing.io',
        password: '12345',
        program: 'BE',
        cohort: 1904,
        role: 0
      });

      const interviewer = await User.create({
        firstName: 'Jack',
        lastName: 'Nicholson',
        email: 'jacknicholson@turing.io',
        password: '12345',
        program: 'FE',
        cohort: 1906,
        role: 1
      });

      const question1 = await Question.create({
        body: "How does your past experiences help you become a better developer?",
      });

      let interview = await Interview.create({
        score: 5,
        summary: 'This was a great interview',
      });

      const note1 = await Note.create({
        score: 5,
        body: "That was a great answer.",
        studentId: student.id,
        interviewerId: interviewer.id,
        questionId: question1.id,
        interviewId: interview.id
      });
      //
      // await UserNote.create({
      //   noteId: note1.id,
      //   userId: student.id
      // });
      //
      // await UserNote.create({
      //   noteId: note1.id,
      //   userId: interviewer.id
      // });

      let reqBody = {
        "query": `mutation {
          updateNote(
            id:${note1.id},
            score: 3,
            body: "Actually this is a mistake") {
              id
              score
              body
            }
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          console.log(response)
          expect(response.status).toBe(200)
          expect(response.body.data.updateNote.id).toBe(note1.id)
          expect(response.body.data.updateNote.score).toBe(3)
          expect(response.body.data.updateNote.body).toBe("Actually this is a mistake")
        })
    })
  })
})
