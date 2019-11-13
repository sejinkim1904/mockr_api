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

describe('Mockr API', () => {
  describe('User Graphql query request', () => {
    beforeEach(async () => {
      await cleanup();
    });

    test('It returns a specified user', async () => {
     const student1 =  await User.create({
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'bobbarker@turing.io',
        password: '12345',
        program: 'BE',
        cohort: 1904,
        role: 0
      });
     const student2 =  await User.create({
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

      const question2 = await Question.create({
        body: "How do you approach TDD?",
      });

      const question3 = await Question.create({
        body: "What is your favorite framework?",
      });

      let interview1 = await Interview.create({
        score: 5,
        summary: 'This was a great interview',
      });

      let interview2 = await Interview.create({
        score: 5,
        summary: 'This was a great interview',
      });

      await InterviewUser.create({
        interviewId: interview1.id,
        userId: student1.id
      });

      await InterviewUser.create({
        interviewId: interview1.id,
        userId: interviewer.id
      });

      await InterviewUser.create({
        interviewId: interview2.id,
        userId: student2.id
      });

      await InterviewUser.create({
        interviewId: interview2.id,
        userId: interviewer.id
      });

      const note1 = await Note.create({
        score: 5,
        body: "That was a great answer.",
        studentId: student1.id,
        interviewerId: interviewer.id,
        questionId: question1.id,
        interviewId: interview1.id
      });

      const note2 = await Note.create({
        score: 3,
        body: "That was a ok answer.",
        studentId: student1.id,
        interviewerId: interviewer.id,
        questionId: question2.id,
        interviewId: interview1.id
      });

      const note3 = await Note.create({
        score: 1,
        body: "Try again.",
        studentId: student1.id,
        interviewerId: interviewer.id,
        questionId: question3.id,
        interviewId: interview1.id
      });

      const note4 = await Note.create({
        score: 5,
        body: "That was a great answer.",
        studentId: student2.id,
        interviewerId: interviewer.id,
        questionId: question1.id,
        interviewId: interview2.id
      });

      const note5 = await Note.create({
        score: 3,
        body: "That was a ok answer.",
        studentId: student2.id,
        interviewerId: interviewer.id,
        questionId: question2.id,
        interviewId: interview2.id
      });

      await UserNote.create({
        noteId: note1.id,
        userId: student1.id
      });

      await UserNote.create({
        noteId: note2.id,
        userId: student1.id
      });

      await UserNote.create({
        noteId: note3.id,
        userId: student1.id
      });

      await UserNote.create({
        noteId: note1.id,
        userId: interviewer.id
      });

      await UserNote.create({
        noteId: note2.id,
        userId: interviewer.id
      });

      await UserNote.create({
        noteId: note3.id,
        userId: interviewer.id
      });

      await UserNote.create({
        noteId: note4.id,
        userId: interviewer.id
      });

      await UserNote.create({
        noteId: note5.id,
        userId: interviewer.id
      });

      await UserNote.create({
        noteId: note4.id,
        userId: student2.id
      });

      await UserNote.create({
        noteId: note5.id,
        userId: student2.id
      });

      let reqBody = {
        "query": `{
          users(role: 0) {
            id
            firstName
            lastName
            email
            program
            cohort
            notes {
              question {
                id
                body
              }
            }
          }
        }`
      };

      return request(app)
        .post('/graphql')
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          console.log(response.body.data.users)
          expect(Object.keys(response.body.data.users[0])).toContain("id")
          expect(Object.keys(response.body.data.users[0])).toContain("firstName")
          expect(Object.keys(response.body.data.users[0])).toContain("lastName")
          expect(Object.keys(response.body.data.users[0])).toContain("email")
          expect(Object.keys(response.body.data.users[0])).toContain("program")
          expect(Object.keys(response.body.data.users[0])).toContain("cohort")
          expect(Object.keys(response.body.data.users[0])).toContain("notes")
          expect(Object.keys(response.body.data.users[0].notes[0])).toContain("question")
        })
    })
  })
})
