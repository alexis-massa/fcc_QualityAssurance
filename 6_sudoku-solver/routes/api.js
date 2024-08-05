'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {

  let solver = new SudokuSolver()

  app.route('/api/check')
    .post((req, res) => {
      // missing values
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) return res.json({ error: 'Required field(s) missing' })
      // Validate starting sudoku
      let puzzleString = req.body.puzzle
      let err = solver.validate(puzzleString)
      if (err) return res.json({ error: err })

      // Validate coordinates and and convert to row, col indexes
      let splitCoord = req.body.coordinate.split('')
      if (splitCoord.length > 2) return res.json({ error: 'Invalid coordinate' })
      if (!(/^[a-iA-I]{1}$/.test(splitCoord[0])) || !(/^[1-9]{1}$/.test(splitCoord[1]))) return res.json({ error: 'Invalid coordinate' })
      let row = solver.letterToNumber(splitCoord[0])
      let col = parseInt(splitCoord[1] - 1)

      // Validate value
      let value = req.body.value
      if (!(/^[1-9]{1}$/.test(value))) return res.json({ error: 'Invalid value' })

      let result = { valid: true }
      if (!solver.checkRowPlacement(puzzleString, row, col, value)) {
        result.valid = false
        result['conflict'] = ['row']
      }
      if (!solver.checkColPlacement(puzzleString, row, col, value)) {
        result.valid = false
        if (result.conflict) result.conflict.push('column'); else result['conflict'] = ['column']
      }
      if (!solver.checkRegionPlacement(puzzleString, row, col, value)) {
        result.valid = false
        if (result.conflict) result.conflict.push('region'); else result['conflict'] = ['region']
      }
      // valid response : { "valid": true }
      // invalide response :   { "valid": false, "conflict": [ "row", "column" ] } 
      console.log(req.body)
      console.log(result)
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
