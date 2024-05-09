# Learnings

### Test before Development

### Test-Driven Development (TDD) Philosophy

#### The common mantra is Red Green Refactor

- You write a failing test first
- Then you write some code to get it passing
- Then you go back and optimize the code

#### Commands

- The following command only runs the tests found in the tests/note_api.test.js file:
  "npm test -- tests/note_api.test.js"
- The --tests-by-name-pattern option can be used for running tests with a specific name:
  "npm test -- --test-name-pattern='pattern' "

### Install these

- npm install --save-dev cross-env
- npm install --save-dev supertest (Act as router given to it as argument like: api = supertest(app) // app is main router )

- npm install express-async-errors

  ( One starts to wonder if it would be possible to refactor the code to eliminate the catch from the methods? Because of the library, we do not need the next(exception) call anymore. The library handles everything under the hood. If an exception occurs in an async route, the execution is automatically passed to the error-handling middleware.
  The express-async-errors library has a solution for this. )
