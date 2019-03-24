const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MongoPagination = require('mongo-cursor-pagination');

const BookSchema = new Schema({
  locationid: {
    type: String,
  },
  bookname: {
    type: String,
    required: [true, "name cannot be empty"]
  },
  author: {
    type: String,
    required: [true, "author cannot be empty"]
  },
  isbn: {
    type: String,
    required: [true, "isbn cannot be empty"]
  },
  publisher: {
    type: String,
    required: [true, "publisher cannot be empty"]
  },
  quantity: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

BookSchema.plugin(MongoPagination.mongoosePlugin, {
  name: 'paginateBN'
});

module.exports = mongoose.model('books', BookSchema);