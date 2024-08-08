const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

suite('Unit Tests', () => {
  suite('SudokuSolver.validate', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      assert.isNotFalse(solver.validate(puzzleString))
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a'
      assert.equal(solver.validate(puzzleString), 'Invalid characters in puzzle')
    })

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'
      assert.equal(solver.validate(puzzleString), 'Expected puzzle to be 81 characters long')
    })
  })

  suite('SudokuSolver.checkRowPlacement()', () => {
    test('Logic handles a valid row placement', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'
      assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 1, 3))
    })

    test('Logic handles an invalid row placement', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'
      assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 1, 5))
    })
  })

  suite('SudokuSolver.checkColPlacement()', () => {
    test('Logic handles a valid column placement', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'
      assert.isTrue(solver.checkColPlacement(puzzleString, 0, 1, 3))
    })

    test('Logic handles an invalid column placement', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'
      assert.isFalse(solver.checkColPlacement(puzzleString, 0, 1, 9))
    })
  })

  suite('SudokuSolver.checkRegionPlacement()', () => {
    test('Logic handles a valid region (3x3 grid) placement', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'
      assert.isTrue(solver.checkRegionPlacement(puzzleString, 0, 1, 3))
    })

    test('Logic handles an invalid region (3x3 grid) placement', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'
      assert.isFalse(solver.checkRegionPlacement(puzzleString, 0, 1, 5))
    })
  })

  suite('SudokuSolver.solve()', () => {
    test('Valid puzzle strings pass the solver', () => {
      let puzzleString = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
      let expectedSolution = '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
      assert.equal(solver.solve(puzzleString), expectedSolution)
    })

    test('Invalid puzzle strings fail the solver', () => {
      let puzzleString = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...a'
      let expectedSolution = '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
      assert.notEqual(solver.solve(puzzleString), expectedSolution)
    })

    test('Solver returns the expected solution for an incomplete puzzle', () => {
      let puzzleString = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...4928561'
      let expectedSolution = '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
      assert.equal(solver.solve(puzzleString), expectedSolution)
    })
  })
});
