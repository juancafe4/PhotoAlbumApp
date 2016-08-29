const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  date: {type: Date, default: Date.now}
})


const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;