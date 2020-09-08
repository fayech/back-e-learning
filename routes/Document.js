const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/Document');
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + '-' + file.originalname )
  }
});
const upload = multer({storage: storage });
const methodOverride = require('method-override');
const fs = require('fs');

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS,PUT"
  );
  next();
});
router.use(methodOverride('_method'));

//post
router.post("/Documentadd", upload.single('url'), (req, res, next) => {
    console.log(req.file);
    const document = new Document({
        Nom:  req.body.Nom,
        url:  req.file.path,
      nom_Groupe:  req.body.nom_Groupe,
      
    });
  
    document.save().then(createddocument => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createddocument._id
      });
    });
  });
  //end-of post 
  //get routes starts here getall
router.get('/getallDocument', (req, res) => {
    Document.find({})
      .then(document => {
        console.log(document);
        res.json(document);
  
      })
      .catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
  });
  //get routes  getall
  // delet Document
router.delete("/deleteDocument/:id",(req, res, next) => {
   

    Document.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });
  //end- of delet
  //get routes by id 
router.get('/GetDocument/:id', (req, res) => {
    Document.findById({ _id: req.params.id })
      .then(document => {
        console.log(document);
        res.json(document);
  
      })
      .catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
  });
  //get routes by id 
  //put routes by id 
router.put('/UpdateDocument/:id',upload.single('url'), (req, res) => {
  const document =({
    Nom:  req.body.Nom,
    url:  req.file.path,
  nom_Groupe:  req.body.nom_Groupe,
  
});

    Document.updateOne({ _id: req.params.id},document, function (err, document) {
      if (err) return console.log('error_msg', 'ERROR: ' + err);
  
      res.json(document);
    });
  });
  //put routes by id 
  
  module.exports = router;