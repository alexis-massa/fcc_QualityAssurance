# 💻 Project : Sudoku Solver
[Project : Sudoku Solver](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver)

Build a full stack JavaScript app that is functionally similar to this: https://sudoku-solver.freecodecamp.rocks/. 
## Steps

## Task list
### Implementation

- [x] All puzzle logic can go into `/controllers/sudoku-solver.js`
    - The validate function should take a given puzzle string and check it to see if it has 81 valid characters for the input.
    - The check functions should be validating against the current state of the board.
    - The solve function should handle solving any given valid puzzle string, not just the test inputs and solutions. You are expected to write out the logic to solve this.
- [x] All routing logic can go into `/routes/api.js`
- [x] See the puzzle-strings.js file in `/controllers` for some sample puzzles your application should solve
- [x] To run the challenge tests on this page, set `NODE_ENV` to `test` without quotes in the `.env` file
- [x] To run the tests in the console, use the command `npm run test`.

### Write the following tests in `tests/1_unit-tests.js`:
- [x] Logic handles a valid puzzle string of 81 characters
- [x] Logic handles a puzzle string with invalid characters (not `1-9` or `.`)
- [x] Logic handles a puzzle string that is not 81 characters in length
- [x] Logic handles a valid row placement
- [x] Logic handles an invalid row placement
- [x] Logic handles a valid column placement
- [x] Logic handles an invalid column placement
- [x] Logic handles a valid region (3x3 grid) placement
- [x] Logic handles an invalid region (3x3 grid) placement
- [x] Valid puzzle strings pass the solver
- [x] Invalid puzzle strings fail the solver
- [x] Solver returns the expected solution for an incomplete puzzle

### Write the following tests in `tests/2_functional-tests.js`:
- [x] Solve a puzzle with valid puzzle string: `POST` request to `/api/solve`
- [x] Solve a puzzle with missing puzzle string: `POST` request to `/api/solve`
- [x] Solve a puzzle with invalid characters: `POST` request to `/api/solve`
- [x] Solve a puzzle with incorrect length: `POST` request to `/api/solve`
- [x] Solve a puzzle that cannot be solved: `POST` request to `/api/solve`
- [x] Check a puzzle placement with all fields: `POST` request to `/api/check`
- [x] Check a puzzle placement with single placement conflict: `POST` request to `/api/check`
- [x] Check a puzzle placement with multiple placement conflicts: `POST` request to `/api/check`
- [x] Check a puzzle placement with all placement conflicts: `POST` request to `/api/check`
- [x] Check a puzzle placement with missing required fields: `POST` request to `/api/check`
- [x] Check a puzzle placement with invalid characters: `POST` request to `/api/check`
- [x] Check a puzzle placement with incorrect length: `POST` request to `/api/check`
- [x] Check a puzzle placement with invalid placement coordinate: `POST` request to `/api/check`
- [x] Check a puzzle placement with invalid placement value: `POST` request to `/api/check`
