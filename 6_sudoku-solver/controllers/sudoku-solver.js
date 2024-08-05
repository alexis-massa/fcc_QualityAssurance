class SudokuSolver {

  /**
   * Validate that the given string is a valid sudoku state
   * @param {string} puzzleString The sudoku string to check in
   * @returns string error if error, nothing otherwise
   */
  validate(puzzleString) {
    // 81 char long
    if (puzzleString.length !== 81) return 'Expected puzzle to be 81 characters long'

    // Only 1-9 and .
    if (!(/^[\d|\.]*$/.test(puzzleString))) return 'Invalid characters in puzzle'

    // All positions are valid (Can be solved)
    for (let i = 0; i < puzzleString.length; i++) {
      const row = Math.floor(i / 9)
      const col = i % 9

      let value = 0;
      if (puzzleString[i] !== '.') value = puzzleString[i]

      if (
        !this.checkRowPlacement(puzzleString, row, col, value)
        || !this.checkColPlacement(puzzleString, row, col, value)
        || !this.checkRegionPlacement(puzzleString, row, col, value)
      ) return 'Puzzle cannot be solved'
    }
  }

  /**
   * Check if the `value` at the given [`row`; `col`] position has conflits in its `row`
   * @param {string} puzzleString The sudoku string to check in
   * @param {number} row The row of the value to check
   * @param {number} col The column of the value to check
   * @param {number} value The value to check for
   * @returns true if valid, false if conflict 
   */
  checkRowPlacement(puzzleString, row, col, value) {
    // puzzleString to grid array
    let grid = this.stringToGrid(puzzleString)

    // If already another value
    if (grid[row][col] !== 0 && grid[row][col] !== value) return false

    for (let i = 0; i < 9; i++) {
      // skipping the current row provided
      if (i == col || grid[row][i] == 0) continue
      //if value exists in the given row
      if (grid[row][i] == value) return false
    }

    return true
  }

  /**
   * Check if the `value` at the given [`row`; `col`] position has conflits in its `col`
   * @param {string} puzzleString The sudoku string to check in
   * @param {number} row The row of the value to check
   * @param {number} col The column of the value to check
   * @param {number} value The value to check for
   * @returns true if valid, false if conflict 
   */
  checkColPlacement(puzzleString, row, col, value) {
    // puzzleString to grid array
    let grid = this.stringToGrid(puzzleString)

    // If already another value
    if (grid[row][col] !== 0 && grid[row][col] !== value) return false

    for (let i = 0; i < 9; i++) {
      // skipping the coordinate provided
      if (i == row || grid[i][col] == 0) continue
      // if value exists in the given col
      if (grid[i][col] == value) return false
    }
    return true

  }

  /**
   * Check if the `value` at the given [`row`; `col`] position has conflits in its region
   * @param {string} puzzleString The sudoku string to check in
   * @param {number} row The row of the value to check
   * @param {number} col The column of the value to check
   * @param {number} value The value to check for
   * @returns true if valid, false if conflict 
   */
  checkRegionPlacement(puzzleString, row, col, value) {
    // puzzleString to grid array
    let grid = this.stringToGrid(puzzleString)

    // If already another value
    if (grid[row][col] !== 0 && grid[row][col] !== value) return false

    let offsetRow = Math.floor(row / 3) * 3
    let offsetCol = Math.floor(col / 3) * 3

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let posRow = i + offsetRow
        let posCol = j + offsetCol
        // skipping the given coordinate
        if ((posRow == row && posCol == col) || grid[posRow][posCol] == 0) continue
        // if value exist in region
        if (grid[posRow][posCol] == value) return false
      }
    }
    return true

  }

  /**
   * Solves a sudoku given as a string
   * @param {string} puzzleString The sudoku to solve 
   * @returns The string for the solved sudoku
   */
  solve(puzzleString) {
    let grid = this.stringToGrid(puzzleString)
    if (!grid) return false //new

    let solved = this.solveSudoku(grid, 0, 0)
    if (!solved) return false //new

    let solvedString = this.gridToString(solved)
    return solvedString

  }

  /**
   * Check if it's safe to place `value` in cell at [`row`; `col`]
   * 
   * Equivalent of calling `checkRowPlacement`, `checkColPlacement` and `checkRegionPlacement`
   * on a grid
   * @param {Array<Array>} grid The sudoku grid
   * @param {number} row The `row` to place the `value` in
   * @param {number} col The `col` to place the `value` in
   * @param {number} value The `value` to check the safety of
   * @returns True if safe, False otherwise
   */
  isSafe(grid, row, col, value) {
    // checkRowPlacement and checkColPlacement
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] == value)
        return false;
      if (grid[x][col] == value)
        return false;
    }

    // checkRegionPlacement
    let offsetRow = row - row % 3,
      offsetCol = col - col % 3;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[offsetRow + i][offsetCol + j] == value)
          return false;

    return true;
  }

  /**
   * Solve the sudoku
   * @param {Array<Array>} grid The sudoku `grid` to solve
   * @param {number} row The `row` of the position to solve
   * @param {number} col The `col` of the position to solve
   * @returns The grid if solved, false otherwise
   */
  solveSudoku(grid, row, col) {
    // if last row and > last col : return grid to finish
    if (row == 9 - 1 && col == 9)
      return grid;

    // if > last col : next line, col 0
    if (col == 9) {
      row++;
      col = 0;
    }

    // If current value not 0, recursion
    if (grid[row][col] != 0)
      return this.solveSudoku(grid, row, col + 1);

    // Foreach value possible 1-9
    for (let num = 1; num < 10; num++) {
      // if it's safe : place it
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        // recursion for next column
        if (this.solveSudoku(grid, row, col + 1))
          return grid;
      }
      // if it's not safe : 0
      grid[row][col] = 0;
    }
    return false;
  }

  /**
   * Returns the number between 1-9 corresponding to a `letter` between A-I
   * @param {char} letter The letter to convert
   * @returns The number corresponding to the given `letter`
   */
  letterToNumber(letter) {
    let number = letter.toUpperCase().charCodeAt(0) - 65
    if (number >= 0 && number < 10) return number
  }

  /**
   * Transforms a 81 char string into a 9x9 array
   * @param {string} puzzleString The sudoku string to check in
   * @returns grid :  9 x 9 array
   * @throws Erro if string is not valid
   */
  stringToGrid(puzzleString) {

    // grid
    const grid = []

    for (let i = 0; i < 9; i++) {
      const row = []
      for (let j = 0; j < 9; j++) {
        // index in string
        const index = i * 9 + j;
        // Assign to cell
        if (puzzleString[index] == '.') row.push(0)
        else row.push(puzzleString[index])
      }
      grid.push(row)
    }
    return grid
  }


  /**
   * Turns a 9x9 `grid` into a 81 char string
   * @param {Array} grid The grid to convert to a string
   * @returns The string for the `grid`
   */
  gridToString(grid) {
    // Check if the input is a 9x9 grid
    if (!Array.isArray(grid) || grid.length !== 9) throw new Error("Input must be a 9x9 grid.");

    for (let i = 0; i < 9; i++) {
      if (!Array.isArray(grid[i]) || grid[i].length !== 9) throw new Error("Input must be a 9x9 grid.");
    }

    let result = "";

    // Tranverse and add to string
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        result += grid[i][j];
      }
    }

    return result;
  }
}

module.exports = SudokuSolver;

