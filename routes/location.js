const express = require('express');
const router = express.Router();
const Books = require('../models/books');
const Location = require('../models/location');


// Gets all Locations
router.get('/location', (req, res) => {
  return Location.paginateBN({
    limit: 10
  }).then((result) => {
    next = result.next;
    console.log(result);
    res.send(result);
    // return result;
  });
});

// Adds new Book Location 
router.post('/location/create', (req, res) => {
  const _Location = new Location(req.params);
  const newLocation = _Location.save();
  if (!newLocation) {
    throw new Error('Error');
  }
  res.send(newLocation);
  // return newLocation;
});

// Updates Book Store Location
router.put('/location/update', (req, res) => {
  return Location.findOneAndUpdate({
    _id: req.params.id
  }, {
    stationname: req.params.stationname,
    date: Date.now,
  }, function (err) {
    if (err) return next(err);
  })
});


// Deletes BookStore Location
router.delete('/location/delete', (req, res) => {
  const _Location = Location.findByIdAndRemove(req.params.id).exec();
  if (!_Location) {
    throw new Error('Error');
  }
  res.send(_Location);
  // return _Location;
});

module.exports = router;