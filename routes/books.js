const express = require('express');
const router = express.Router();
const Books = require('../models/books');
const Location = require('../models/location');


// Gets all books using cursor pagination
router.get('/', (req, res) => {
  return Books.paginateBN({
    limit: 10
  }).then((result) => {
    next = result.next;
    console.log(result);
    res.send(result);
    // return result;
  });
});


// Adds new Books using the location ID
router.post('/book/create', (req, res) => {
  const _Books = new Books(req.params);
  const _newBook = _Books.save();
  if (_newBook) {
    throw new Error('Error');
  }
  res.send(_newBook);
  // return _newBook;
});


// Updates the List of Books
router.put('/book/update', (req, res) => {
  return Books.findOneAndUpdate({
    _id: req.params.id
  }, {
    bookname: req.params.bookname,
    author: req.params.author,
    isbn: req.params.isbn,
    publisher: req.params.publisher,
    quantity: req.params.quantity,
    date: Date.now,
  }, function (err) {
    if (err) return next(err);
  })
});

// Deletes all Books
router.delete('/book/delete', (req, res) => {
  const _Books = Books.findByIdAndRemove(req.params.id).exec();
  if (!_Books) {
    throw new Error('Error');
  }
  res.send(_newBook);
  // return _Books;
});

module.exports = router;