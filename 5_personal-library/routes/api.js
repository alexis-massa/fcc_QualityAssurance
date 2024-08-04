'use strict';

const mongoose = require('mongoose');

module.exports = function (app) {

  // DB Connection & Schema layout 
  mongoose.connect(process.env.MONGO_URI);
  const Book = require('../models/book');

  app.route('/api/books')
    .get((req, res) => {
      Book.find().exec()
        .then(data => { 
          if (data) { 
            return res.json(data); 
          } else {
            return res.json([]);
          }
        })
        .catch(e => { 
          console.error(e); 
          return res.status(500).send('Internal Server Error');
        });
    })
    .post((req, res) => {
      let title = req.body.title;
      if (!title) return res.send('missing required field title');
      let newBook = new Book({ title: title });
      newBook.save()
        .then(data => { return res.json(data); })
        .catch(err => { 
          console.error(err); 
          return res.status(500).send('Internal Server Error');
        });
    })
    .delete((req, res) => {
      Book.deleteMany().exec()
        .then(() => { return res.send('complete delete successful'); })
        .catch(e => { 
          console.error(e); 
          return res.status(500).send('Internal Server Error');
        });
    });

  app.route('/api/books/:id')
    .get((req, res) => {
      let bookid = req.params.id;
      Book.findById(bookid).exec()
        .then(data => {
          if (data) return res.json(data);
          else return res.send('no book exists');
        })
        .catch(err => { 
          console.error(err); 
          return res.status(500).send('Internal Server Error');
        });
    })
    .post((req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!bookid) return res.send('missing required field bookid');
      else if (!comment) return res.send('missing required field comment');
      else {
        Book.findById(bookid).exec()
          .then(data => {
            if (data) {
              data.comments.push(comment);
              data.commentcount = ++data.commentcount;
              data.save()
                .then(data => { return res.json(data); })
                .catch(err => { 
                  console.error(err); 
                  return res.status(500).send('Internal Server Error');
                });
            } else return res.send('no book exists');
          })
          .catch(err => { 
            console.error(err); 
            return res.status(500).send('Internal Server Error');
          });
      }
    })
    .delete((req, res) => {
      let bookid = req.params.id;
      Book.findByIdAndDelete(bookid).exec()
        .then(data => {
          if (data) return res.send('delete successful');
          else return res.send('no book exists');
        }).catch(err => { 
          console.error(err); 
          return res.status(500).send('Internal Server Error');
        });
    });

};
