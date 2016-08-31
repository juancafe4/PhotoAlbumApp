const express = require('express');
const router = express.Router();

const Album = require('../models/Album');
const Photo = require('../models/Photo');
router.route('/')
.get((req, res) => {
  Album.find({}, (err, albums) => {
    res.status(err ? 400 : 200). send(err || albums)
  }).populate('photos')
})
.post((req, res) => {
  Album.create(req.body, (err, newAlbum) => {
    res.status(err ? 400 : 200).send(err || newAlbum);
  });
})
router.route('/:id')
.get((req, res) => {
  Album.findById(req.params.id, (err, album) => {
    res.status(err ? 400 : 200).send(err || album);
  }).populate('photos')
})
  .delete(Album.RemoveMiddleware, (req, res) => {
    console.log('here')
    Album.findByIdAndRemove(req.params.id, err => {
      res.status(err ? 400 : 200).send(err);
    })
  })

  .put((req, res) =>{
    Album.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, album) =>{
      if(err){
        return res.status(400).send(err);
      }
      Album.find({}, (err, albums) => {
        res.status(err ? 400: 200).send(err || albums);
      })
    });
  })

router.route('/:id/addPhoto/:photoId').put((req, res) => {
  Album.findById(req.params.id, (err, album) => {
    if(err || !album) {
      return res.status(400).send(err || 'Album not found.');
    }

    let photoId = req.params.photoId;
    Photo.findById(photoId, (err , photo) => {
      if(err || !photo) {
        return res.status(400).send(err || 'Photo not found.');
      }
      album.photos.push(photoId);
      album.save((err, savedAlbum) => {
        res.status(err ? 400 : 200).send(err || savedAlbum);
      });
    });
    
  });
});
module.exports = router;