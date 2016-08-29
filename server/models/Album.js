const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  name: {type: String, required: true},
  photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
})


const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;