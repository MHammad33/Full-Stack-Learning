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
- npm install --save-dev supertest
