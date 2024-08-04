const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String },
  comments: [{ type: String }],
  commentcount: { type: Number, default: 0 }
}, { timestamps: true })


module.exports = mongoose.model('Book', bookSchema)