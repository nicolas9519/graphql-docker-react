const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: Schema.Types.ObjectId
});

module.exports = model('Book', bookSchema);
