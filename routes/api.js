'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {

  let solver = new SudokuSolver()

  app.route('/api/check')
    .post((req, res) => {
      // missing values
      if (!req.body.puzzleString || !req.body.coordinate || !req.body.value) return res.json({ error: 'Required field(s) missing' })
      let puzzleString = req.body.puzzle

      // row, col and convert to indexes
      let [rowO, colO] = req.body.coordinate.split('')
      let row = solver.letterToNumber(rowO) - 1
      let col = parseInt(colO - 1)
      if (row > 8 || row < 0 || col > 8 || col < 0) return res.json({ error: 'Invalid coordinate' })

      let value = req.body.value
      if (value > 8 || value < 0) return res.json({ error: 'Invalid value' })

      let result = { valid: true }
      if (!solver.checkRowPlacement(puzzleString, row, col, value)) {
        result.valid = false
        result['conflict'] = ['row']
      }
      if (!solver.checkColPlacement(puzzleString, row, col, value)) {
        result.valid = false
        if (result.conflict) result.conflict.push("col"); else result['conflict'] = ['col']
      }
      if (!solver.checkRegionPlacement(puzzleString, row, col, value)) {
        result.valid = false
        if (result.conflict) result.conflict.push("region"); else result['conflict'] = ['region']
      }
      // valid response : { "valid": true }
      // invalide response :   { "valid": false, "conflict": [ "row", "column" ] } 
      return res.json(result)

    })

  app.route('/api/solve')
    .post((req, res) => {

      if (!req.body.puzzle) return res.json({ error: 'Required field missing' })

      let puzzleString = req.body.puzzle

      // Validate starting sudoku
      let err = solver.validate(puzzleString)
      if (err) return res.json({ error: err })

      // Solve
      let solved = solver.solve(puzzleString)
      if (solved) return res.json({ solution: solved })
      else return res.json({ error: 'Unknown error' })
    })
}
