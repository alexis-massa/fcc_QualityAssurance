const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  // #region Solve
  suite('Solve : POST /api/solve', () => {
    test('valid puzzle string', () => {
      let obj = { puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6' }
      let expectedSolution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746'
      chai.request(server)
        .keepOpen()
        .post('/api/solve')
        .send(obj)
        .end((err, res) => {
          // Solve a puzzle with valid puzzle string: POST request to /api/solve
          assert.property(res.body, 'solution')
          assert.equal(res.body.solution, expectedSolution)
        })
    })

    test('missing puzzle string', () => {
      chai.request(server)
        .keepOpen()
        .post('/api/solve')
        .send({})
        .end((err, res) => {
          // Solve a puzzle with missing puzzle string: POST request to /api/solve
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Required field missing')
        })
    })

    test('invalid characters', () => {
      let obj = { puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a' }
      chai.request(server)
        .keepOpen()
        .post('/api/solve')
        .send(obj)
        .end((err, res) => {
          // Solve a puzzle with invalid characters: POST request to /api/solve
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Invalid characters in puzzle')
        })
    })

    test('incorrect length', () => {
      let obj = { puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37' }
      chai.request(server)
        .keepOpen()
        .post('/api/solve')
        .send(obj)
        .end((err, res) => {
          // Solve a puzzle with incorrect length: POST request to /api/solve
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        })
    })

    test('cannot be solved', () => {
      let obj = { puzzle: '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' }
      chai.request(server)
        .keepOpen()
        .post('/api/solve')
        .send(obj)
        .end((err, res) => {
          // Solve a puzzle that cannot be solved: POST request to /api/solve
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Puzzle cannot be solved')
        })
    })
  })

  // #region Check
  suite('Check : POST /api/check', () => {
    test('all fields', () => {
      let obj = {
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'A3',
        value: 5
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          // Check a puzzle placement with all fields: POST request to /api/check
          assert.property(res.body, 'valid')
          assert.equal(res.body.valid, true)
        })
    })

    test('single placement conflict', () => {
      let obj = {
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'A7',
        value: 8
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          // Check a puzzle placement with single placement conflict: POST request to /api/check
          assert.property(res.body, 'valid')
          assert.equal(res.body.valid, false)
          assert.property(res.body, 'conflict')
          assert.isArray(res.body.conflict)
          assert.include(res.body.conflict, 'row')
        })
    })

    test('multiple placement conflicts', () => {
      let obj = {
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'A3',
        value: 8
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
          assert.property(res.body, 'valid')
          assert.equal(res.body.valid, false)
          assert.property(res.body, 'conflict')
          assert.isArray(res.body.conflict)
          assert.include(res.body.conflict, 'row')
          assert.include(res.body.conflict, 'region')
        })
    })

    test('all placement conflicts', () => {
      let obj = {
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'D3',
        value: 9
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          // Check a puzzle placement with all placement conflicts: POST request to /api/check
          assert.property(res.body, 'valid')
          assert.equal(res.body.valid, false)
          assert.property(res.body, 'conflict')
          assert.isArray(res.body.conflict)
          assert.include(res.body.conflict, 'row')
          assert.include(res.body.conflict, 'column')
          assert.include(res.body.conflict, 'region')
        })
    })

    test('missing required fields', () => {
      let obj = {
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'D3',
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          // Check a puzzle placement with missing required fields: POST request to /api/check
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Required field(s) missing')
        })
    })

    test('invalid characters', () => {
      let obj = {
        puzzle: '82..4..6...16..89...98315.749.157..........a..53..4...96.415..81..7632..3...28.51',
        coordinate: 'A3',
        value: 2
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          // Check a puzzle placement with invalid characters: POST request to /api/check
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Invalid characters in puzzle')
        })
    })

    test('incorrect length', () => {
      let obj = {
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.5',
        coordinate: 'T3',
        value: 2
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          // Check a puzzle placement with incorrect length: POST request to /api/check
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        })
    })

    test('invalid placement coordinate', () => {
      let obj = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'P3',
        value: 1
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Invalid coordinate')
        })
    })

    test('invalid placement value', () => {
      let obj = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'A3',
        value: 1
      }
      chai.request(server)
        .keepOpen()
        .post('/api/check')
        .send(obj)
        .end((err, res) => {
          // Check a puzzle placement with invalid placement value: POST request to /api/check
          assert.property(res.body, 'valid')
          assert.property(res.body, 'conflict')
          assert.include(res.body.conflict, 'row')
          assert.include(res.body.conflict, 'column')
          assert.include(res.body.conflict, 'region')
        })
    })

  })

});

