const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const Photo = require('../models/Photo');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.single('image'), (req, res) => {
  let filePath = path.join(__dirname, '../../otter4.jpg');

  console.log('req.file ', req.file, req.body.name)
  if (req.file) 

    Photo.upload(req.file, req.body.name, (err, image) => {
      //1.Upload the data to s3
      //2. To determine the url of the image on S3
      //3. We can save an image document, with the url (and fileName)
      //4 Callback with saved image doc.
      res.status(err ? 400 : 200).send(err || image)
    })
  else 
    Photo.create(req.body, (err, newPhoto) => {
      res.status(err ? 400 : 200).send(err || newPhoto);
    });
});


router.route('/')
.get((req, res) => {
  Photo.find({}, (err, photos) => {
    res.status(err ? 400 : 200). send(err || photos)
  })
})
// .post((req, res) => {
//   Photo.create(req.body, (err, newPhoto) => {
//     res.status(err ? 400 : 200).send(err || newPhoto);
//   });
// })
router.route('/:id')
.get((req, res) => {
  Photo.findById(req.params.id, (err, photos) => {
    res.status(err ? 400 : 200).send(err || photos);
  });
})
.delete((req, res) => {
  Photo.findById(req.params.id, (err, photo) => {
    if (err || !photo) return res.status(400).send(err || "Photo not found")
    if (photo.url.match('s3')) {
      // Photo.deleteLink(photo.url, (err, data) => {

      // })
      Photo.findByIdAndRemove(req.params.id, err => {
        res.status(err ? 400 : 200).send(err);
      })
    }
    else {
      Photo.findByIdAndRemove(req.params.id, err => {
        res.status(err ? 400 : 200).send(err);
      })
    }
    
  });
})
.put((req, res) =>{
  Photo.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, photos) =>{
    if(err){
      return res.status(400).send(err);
    }
    Photo.find({}, (err, photos) => {
      res.status(err ? 400: 200).send(err || photos);
    })
  });
})

module.exports = router;