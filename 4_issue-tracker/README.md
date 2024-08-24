# 💻 Project : Issue tracker
[Project : Issue Tracker](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker)

Build a full stack JavaScript app that is functionally similar to this: https://issue-tracker.freecodecamp.rocks/. 
## Task list

### Implementation
- [x] Complete the necessary routes in `/routes/api.js`
- [x] Create all of the functional tests in `tests/2_functional-tests.js`
- [x] Copy the `sample.env` file to `.env` and set the variables appropriately
- [x] To run the tests automatically, add `NODE_ENV=test` in your `.env` file
- [x] To run the tests in the console, use the command `npm run test`

### Write the following tests in tests/2_functional-tests.js:

- [x] Create an issue with every field: `POST` request to `/api/issues/{project}`
- [x] Create an issue with only required fields: `POST` request to `/api/issues/{project}`
- [x] Create an issue with missing required fields: `POST` request to `/api/issues/{project}`
- [x] View issues on a project: GET request to `/api/issues/{project}`
- [x] View issues on a project with one filter: `GET` request to `/api/issues/{project}`
- [x] View issues on a project with multiple filters: `GET` request to `/api/issues/{project}`
- [x] Update one field on an issue: `PUT` request to `/api/issues/{project}`
- [x] Update multiple fields on an issue: `PUT` request to `/api/issues/{project}`
- [x] Update an issue with missing `_id`: `PUT` request to `/api/issues/{project}`
- [x] Update an issue with no fields to update: `PUT` request to `/api/issues/{project}`
- [x] Update an issue with an invalid `_id`: `PUT` request to `/api/issues/{project}`
- [x] Delete an issue: `DELETE` request to `/api/issues/{project}`
- [x] Delete an issue with an invalid `_id`: `DELETE` request to `/api/issues/{project}`
- [x] Delete an issue with missing `_id`: `DELETE` request to `/api/issues/{project}`

