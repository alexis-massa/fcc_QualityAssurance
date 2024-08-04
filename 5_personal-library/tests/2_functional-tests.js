const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')
const Book = require('../models/book')

chai.use(chaiHttp)

suite('Functional Tests', () => {

  suite('Routing tests', () => {

    suite('POST /api/books with title => create book object/expect book object', () => {

      test('Test POST /api/books with title', async () => {
        const res = await chai.request(server)
          .keepOpen()
          .post('/api/books')
          .send({ title: 'to be deleted' })

        assert.equal(res.status, 200)
        assert.property(res.body, '_id')
        assert.property(res.body, 'title')
        assert.equal(res.body.title, 'to be deleted')
      })

      test('Test POST /api/books with no title given', async () => {
        const res = await chai.request(server)
          .keepOpen()
          .post('/api/books')
          .send({})

        assert.equal(res.status, 200)
        assert.equal(res.text, 'missing required field title')
      })
    })

    suite('GET /api/books => array of books', () => {

      test('Test GET /api/books', async () => {
        const res = await chai.request(server)
          .keepOpen()
          .get('/api/books')

        assert.equal(res.status, 200)
        assert.isArray(res.body)
        assert.property(res.body[0], 'comments')
        assert.property(res.body[0], 'commentcount')
        assert.property(res.body[0], '_id')
        assert.property(res.body[0], 'title')
      })
    })

    suite('GET /api/books/[id] => book object with [id]', () => {

      test('Test GET /api/books/[id] with id not in db', async () => {
        const res = await chai.request(server)
          .keepOpen()
          .get('/api/books/60f56b8c80d8f30591c3d003')

        assert.equal(res.status, 200)
        assert.equal(res.text, 'no book exists')
      })

      test('Test GET /api/books/[id] with valid id in db', async () => {
        const foundID = await Book.find({}).exec()
        const res = await chai.request(server)
          .keepOpen()
          .get(`/api/books/${foundID[0]._id}`)

        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.property(res.body, 'comments')
        assert.property(res.body, 'commentcount')
        assert.property(res.body, '_id')
        assert.property(res.body, 'title')
      })
    })

    suite('POST /api/books/[id] => add comment/expect book object with id', () => {

      test('Test POST /api/books/[id] with comment', async () => {
        const foundID = await Book.find({}).exec()
        const res = await chai.request(server)
          .keepOpen()
          .post(`/api/books/${foundID[0]._id}`)
          .send({ comment: 'comm' })

        assert.equal(res.status, 200)
        assert.property(res.body, 'comments')
        assert.isArray(res.body.comments)
        assert.property(res.body, 'commentcount')
        assert.property(res.body, '_id')
        assert.property(res.body, 'title')
      })

      test('Test POST /api/books/[id] without comment field', async () => {
        const res = await chai.request(server)
          .keepOpen()
          .post('/api/books/60f56b8c80d8f30591c3d003')

        assert.equal(res.status, 200)
        assert.deepEqual(res.text, 'missing required field comment')
      })

      test('Test POST /api/books/[id] with comment, id not in db', async () => {
        const res = await chai.request(server)
          .keepOpen()
          .post('/api/books/60f56b8c80d8f30591c3d003')
          .send({ comment: 'comment' })

        assert.equal(res.status, 200)
        assert.deepEqual(res.text, 'no book exists')
      })
    })

    suite('DELETE /api/books/[id] => delete book object id', () => {

      test('Test DELETE /api/books/[id] with valid id in db', async () => {
        const foundDoc = await Book.findOne({ title: 'to be deleted' }).exec()
        const res = await chai.request(server)
          .keepOpen()
          .delete(`/api/books/${foundDoc._id}`)

        assert.equal(res.status, 200)
        assert.deepEqual(res.text, 'delete successful')
      })

      test('Test DELETE /api/books/[id] with id not in db', async () => {
        const res = await chai.request(server)
          .keepOpen()
          .delete('/api/books/60f56b8c80d8f30591c3d003')

        assert.equal(res.status, 200)
        assert.deepEqual(res.text, 'no book exists')
      })
    })

  })
})
