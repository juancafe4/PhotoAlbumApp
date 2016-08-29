const express = require('express');
const router = express.Router();

const Album = require('../models/Album');

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
  });
})
.delete((req, res) => {
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

module.exports = router;