const express = require('express');
const router = express.Router();
const Classe = require('../models/classe');
const  cors = require('cors');

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
 //post  
router.post("/AddClasse", (req, res, next) => {
    const classe = new Classe({
        Nom: req.body.Nom,
        Niveau: req.body.Niveau,
       
    });
    classe.save().then(createdClasse => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createdClasse._id
      });
    });
  });
  //end-of  post

  //get all
  router.get('/getallClasse', (req, res) => {
    Classe.find({})
      .then(classe => {
        console.log(classe);
        res.json(classe);
  
      })
      .catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
  });
  //end get all
// delet Classe
router.delete("/deleteClasse/:id", (req, res, next) => {
    Classe.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });
  //end- of delet Classe
  //get routes by id 
router.get('/GetClasse/:id', (req, res) => {
    Classe.findById({ _id: req.params.id })
      .then(classe => {
        console.log(classe);
        res.json(classe);
  
      })
      .catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
  });
  //get routes by id 

  //put routes by id Classe
router.put('/UpdateClasse/:id', (req, res) => {
    let searchQuery = { _id: req.params.id };
  console.log(req.body);
  Classe.updateOne(searchQuery,req.body, function (err, classe) {
      if (err) return console.log('error_msg', 'ERROR: ' + err);
  
      res.json(classe);
    });
  });
  //put routes by id  Classe
  module.exports = router;