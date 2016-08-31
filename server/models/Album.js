const mongoose = require('mongoose');
const async = require('async');
const AlbumSchema = new mongoose.Schema({
  name: {type: String, required: true},
  photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
})


AlbumSchema.statics.RemoveMiddleware = function(req, res, next) {
  let id = req.params.id;

  mongoose.model('Album').findById(id, (err, albums) => {
    if (err) return res.status(400).send(err)

    let {photos}= albums
    let Photo = mongoose.model('Photo');
    async.each(photos,
      (photo, asyncCb) => {
        
        Photo.findById(photo, (err, ph) => {
          if (err) return res.status(400).send(err)
          if (ph.url.match('s3')) {
            Photo.deleteLink(ph.url, (err, data) => {
                if (err) return res.status(400).send(err)
                Photo.findByIdAndRemove(ph._id, err => {
                  if (err) return res.status(400).send(err)
                  asyncCb();
                })
            })
          } else {
            Photo.findByIdAndRemove(ph._id, err => {
              if (err) return res.status(400).send(err)
              asyncCb();
            })
          }
        })
      }, 
      err => {
        if (err) return res.status(400).send(err)
        next  
      })
  });
}


const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;