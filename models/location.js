const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MongoPagination = require('mongo-cursor-pagination');

const LocationSchema = new Schema({
  stationname: {
    type: String,
    required: [true, "name cannot be empty"]
  },
  createdon: {
    type: Date,
    default: Date.now
  },
  booklist: [{
    books: {
      type: Schema.Types.ObjectId,
      ref: "books"
    }
  }]
}, {
  timestamps: true
});

LocationSchema.plugin(MongoPagination.mongoosePlugin, {
  name: 'paginateLOC'
});

module.exports = mongoose.model('location', LocationSchema);