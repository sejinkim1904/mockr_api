# Project: Mockr API

## Visit the app on Heroku:
https://thawing-wave-76846.herokuapp.com/graphql

## Contributors
* [Sejin Kim](https://github.com/froydroyce)
* [Djavan Munroe](https://github.com/djavanm)

## About the Project  
* The Mockr API was built as a backend service that stores users data to be displayed in a mock interview app of the same name.
* Mockr was a 13 day group project, completed by two front-end and two back-end focused students at Turing School of Software and design.
* The purpose was to build a tested Express API in JavaScript that users will utilize to track mock interview data. Users can see prior interviews, which includes data about the users's notes, and questions answered.

## Tech Stack
* Express.js
* Node.js
* Sequelize
* Jest
* PostgreSQL

## Packages Used
* GraphQL

## GitHub Repository
https://github.com/froydroyce/mockr_api

## Database Diagram
![schema](https://i.imgur.com/ZUqzRb0.png)

## Local Setup
  ### Instructions:
1. Clone the GitHub repository
2. Go to the directory with the new repo  
3. Run `npm install`
4. Setup database:
```
   npx sequelize db:create
   npx sequelize db:migrate
```
5. To run the server: `npm start`

  ### Run tests:
1. Run `npm test`
2. To run a single test file: `npm test -- <file_name>`
3. To generate coverage report: `open coverage/lcov-report/index.html`


## GraphQL Queries:

###  Question Queries:

#### 1) User can add a Question

***Request:***
```
POST '/graphql'
mutation {
  addQuestion(body: "How does your past experiences help you become a better developer?")
   {
    id
    body
    active
   }
 }
```

***Response Example:***
```
status: 200
{
  "data": {
    "addQuestion": {
      "id": 8,
      "body": "How does your past experiences help you become a better developer?",
      "active": true
    }
  }
}
```

#### 2) User can update a question

***Request:***
```
POST '/graphql'
mutation {
  updateQuestionBody(id: 1, body: "How do you approach test driven development?")
   {
    id
    body
    active
   }
 }
```
***Response Example:***
```
status: 200
{
  "data": {
    "updateQuestionBody": {
      "id": 1,
      "body": "How do you approach test driven development?",
      "active": true
    }
  }
}
```

#### 3) User can deactivate a question

***Request:***
```
POST '/graphql'
mutation {
  deactivateQuestion(id: 1, active: false)
    {
      id
      body
      active
    }
 }
```

***Response Example:***
```
status: 200
{
  "data": {
    "deactivateQuestion": {
      "id": 1,
      "body": "How do you approach test driven development?",
      "active": false
    }
  }
}
```

#### 4) User can activate a question

***Request:***
```
POST '/graphql'
mutation {
  activateQuestion(id: 1, active: true)
   {
    id
    body
    active
   }
 }
```

***Response Example:***
```
status: 200
{
  "data": {
    "activateQuestion": {
      "id": 1,
      "body": "How do you approach test driven development?",
      "active": true
    }
  }
}
```

#### 5) User can get all questions.

***Request:***
```
POST '/graphql'
query {
  questions
   {
    id
    body
    active
   }
 }`
```

***Response Example:***
```
status: 200
{
  "data": {
    "questions": [
      {
        "id": 1,
        "body": "What is your favorite framework, and why?",
        "active": true
      },
      {
        "id": 2,
        "body": "How do you like working on teams?",
        "active": true
      },
      {
        "id": 3,
        "body": "Do you enjot TDD?",
        "active": false
      }
    ]
  }
}
```
***Request:***
```
POST '/graphql'
query {
  randomQuestions
   {
    id
    body
    active
   }
 }`
```

***Response Example:***
```
status: 200
{
  "data": {
    "randomQuestions": [
      {
        "id": 1,
        "body": "What is your favorite framework, and why?",
        "active": true
      },
      {
        "id": 3,
        "body": "How do you like working on teams?",
        "active": true
      },
      {
        "id": 2,
        "body": "Do you enjot TDD?",
        "active": false
      }
    ]
  }
}
```

### Interview Queries:

#### 6) User can create an interview

***Request:***
```
POST '/graphql'
mutation {
  addInterview(studentId, interviewerId)
 {
    id
    score
    summary
    users {
      id
      firstName
      lastName
      email
      program,
      cohort
      role
    }
  }
 }`
```

***Response Example:***
```
status: 200
{
  "data": {
    "addInterview": {
      "id": 5,
      "score": null,
      "summary": null,
      "users": [
        {
          "id": 9000,
          "firstName": "Wayne",
          "lastName": "Brady",
          "role": 0
        },
        {
          "id": 9002,
          "firstName": "Ian",
          "lastName": "Douglas",
          "role": 1
        }
      ]
    }
  }
}
```

#### 7) User can finalize an interview.

***Request:***
```
POST '/graphql'
mutation {
  finalizeInterview(id: 3, score: 3, summary:"What a great interview") {
    id
    score
    summary
  }
}`

```

***Response Example:***
```
status: 200

{
  "data": {
    "finalizeInterview": {
      "id": 3,
      "score": 3,
      "summary": "What a great interview"
    }
  }
}
```


#### 8) User can add a note

***Request:***
```
POST '/graphql'
mutation {
  addNote(
    score: 5
    body: "This was a really awesome answer."
    questionId: 3
    interviewId: 3
    studentId: 9000
    interviewerId: 9003
  ) {
    id
    body
    score
    interview {
      id
    }
    question {
      id
      body
    }
    users {
      id
      firstName
      lastName
      role
    }
  }
}
```
* Adds a note which creates a relationship for the student and interviewer, as well as the question that was asked.


***Response Example:***
```
status: 200
{
  "data": {
    "addNote": {
      "id": 6,
      "body": "This was a really awesome answer.",
      "score": 5,
      "interview": {
        "id": 3
      },
      "question": {
        "id": 3,
        "body": "This is another question."
      },
      "users": [
        {
          "id": 9000,
          "firstName": "Wayne",
          "lastName": "Brady",
          "role": 0
        },
        {
          "id": 9003,
          "firstName": "Will",
          "lastName": "Mitchell",
          "role": 1
        }
      ]
    }
  }
}
```

#### 9) User can update a note

***Request:***
```
POST '/graphql'
mutation {
  updateNote(id: 3, score: 3, body: "This was a mistake") {
    id
    body
    score 
  }
}
```
***Response Example:***
```
status: 200
{
  "data": {
    "updateNote": {
      "id": 1,
      "body": "Actually this was a mistake",
      "score": 1
    }
  }
}
```

* Adds a record of whether or not a specific question was asked, or skipped during an interview.

### User Queries:

#### 10) User get get data on a user

***Request:***
```
POST '/graphql'
query {
  user(id: 9000) {
    id
    firstName
    lastName
    role
    interviews {
      id
      users {
        firstName
        lastName
        role
      }
      notes {
        id
        body
        score
        question {
          body
        }
      }
    }
  }
}
`
```
***Response Example:***
```
status: 200
{
  "data": {
    "user": {
      "id": 9000,
      "firstName": "Wayne",
      "lastName": "Brady",
      "role": 0,
      "interviews": [
        {
          "id": 1,
          "users": [
            {
              "firstName": "Wayne",
              "lastName": "Brady",
              "role": 0
            },
            {
              "firstName": "Ian",
              "lastName": "Douglas",
              "role": 1
            }
          ],
          "notes": [
            {
              "id": 3,
              "body": "This was a really bad answer.",
              "score": 1,
              "question": {
                "body": "This is another question."
              }
            },
            {
              "id": 2,
              "body": "This was a really great answer.",
              "score": 3,
              "question": {
                "body": "This is an amazing question."
              }
            },
            {
              "id": 1,
              "body": "This was a great answer.",
              "score": 5,
              "question": {
                "body": "Lets see if this works"
              }
            }
          ]
        },
        {
          "id": 2,
          "users": [
            {
              "firstName": "Wayne",
              "lastName": "Brady",
              "role": 0
            },
            {
              "firstName": "Will",
              "lastName": "Mitchell",
              "role": 1
            }
          ],
          "notes": [
            {
              "id": 4,
              "body": "This was a really bad answer.",
              "score": 1,
              "question": {
                "body": "This is another question."
              }
            }
          ]
        },
        {
          "id": 3,
          "users": [
            {
              "firstName": "Wayne",
              "lastName": "Brady",
              "role": 0
            },
            {
              "firstName": "Ian",
              "lastName": "Douglas",
              "role": 1
            }
          ],
          "notes": [
            {
              "id": 6,
              "body": "This was a really awesome answer.",
              "score": 5,
              "question": {
                "body": "This is another question."
              }
            },
            {
              "id": 5,
              "body": "This was a really awesome answer.",
              "score": 5,
              "question": {
                "body": "This is another question."
              }
            }
          ]
        },
        {
          "id": 4,
          "users": [
            {
              "firstName": "Wayne",
              "lastName": "Brady",
              "role": 0
            },
            {
              "firstName": "Ian",
              "lastName": "Douglas",
              "role": 1
            }
          ],
          "notes": []
        },
        {
          "id": 5,
          "users": [
            {
              "firstName": "Wayne",
              "lastName": "Brady",
              "role": 0
            },
            {
              "firstName": "Ian",
              "lastName": "Douglas",
              "role": 1
            }
          ],
          "notes": []
        }
      ]
    }
  }
}
```

#### 11) User can query for all users, or all users who have a specific role.

***Request:***
```
POST '/graphql'
query {
  users(role: 1) {
    id
    firstName
    lastName
    email
    role
    program
    cohort
  }
}
```
***Response Example:***
```
status: 200
{
  "data": {
    "users": [
      {
        "id": 9002,
        "firstName": "Ian",
        "lastName": "Douglas",
        "email": "iandouglas@turing.io",
        "role": 1,
        "program": "BE",
        "cohort": null
      },
      {
        "id": 9003,
        "firstName": "Will",
        "lastName": "Mitchell",
        "email": "willmitchell@turing.io",
        "role": 1,
        "program": "FE",
        "cohort": null
      }
    ]
  }
}
```

* If the role attribute is omitted, then all users will be returned.




