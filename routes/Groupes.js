const express = require('express');
const router = express.Router();
const Groupes = require('../models/Groupes');
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
router.post("/AddGroupes", (req, res, next) => {
    const Groupe = new Groupes({
        Nom: req.body.Nom,
        nom_E: req.body.nom_E,
        Niveau: req.body.niveau
       
    });
    Groupe.save().then(createdGroupe => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createdGroupe._id
      });
    });
  });
  //end-of  post

  //get all
  router.get('/getallGroupes', (req, res) => {
    Groupes.find({})
      .then(Groupe => {
        console.log(Groupe);
        res.json(Groupe);
  
      })
      .catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
  });
  //end get all
// delet Groupes
router.delete("/deleteGroup/:id", (req, res, next) => {
    Groupes.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });
  //end- of delet Groupes
  //get routes by id 
router.get('/GetGroupe/:id', (req, res) => {
    Groupes.findById({ _id: req.params.id })
      .then(Groupe => {
        console.log(Groupe);
        res.json(Groupe);
  
      })
      .catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
  });
  //get routes by id 

  //put routes by id 
router.put('/UpdateGroupe/:id', (req, res) => {
    let searchQuery = { _id: req.params.id };
  console.log(req.body);
    Groupes.updateOne(searchQuery,req.body, function (err, Groupe) {
      if (err) return console.log('error_msg', 'ERROR: ' + err);
  
      res.json(Groupe);
    });
  });
  //put routes by id 
  module.exports = router;