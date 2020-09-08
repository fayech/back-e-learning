const express = require('express');
const router = express.Router();
const Groupes = require('../models/Groupes');
const Etudiant = require('../models/Etudiant');
const Document = require('../models/Document');
const Enseignant = require('../models/Enseignant');

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
  //get routes starts here getall
  router.get('/NbEtudiant', (req, res) => {
    Etudiant.aggregate( 
     [ { $group : { _id : "$Niveau", count:{$sum:1} } } ]
     ).then(Group => {
        console.log(Group);
        res.json(Group); 
    }).catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
      
  });
  //get routes  getall

 //get routes starts here getall
  router.get('/Nbenseignant', (req, res) => {
    Groupes.aggregate( 
     [ { $group : { _id : "$nom_E", count:{$sum:1} } } ]
     ).then(Group => {
        console.log(Group);
        res.json(Group); 
    }).catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
      
  });
  //get routes  getall
  router.get('/NbEtudiantTotal', (req, res) => {
   

     Etudiant.aggregate( 
      [ { $group : { _id :"Etudiant", count:{$sum:1} } } ]).then(Group => {
        console.log(Group);
        res.json(Group); 
    }).catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
      
  });
    //get routes  getall
    router.get('/NbEnseignantTotal', (req, res) => {
   
      Enseignant.aggregate( 
       [ { $group : { _id :"Enseignant", count:{$sum:1} } } ]).then(Group => {
         console.log(Group);
         res.json(Group); 
     }).catch(err => {
         console.log('error_msg', 'ERROR: ' + err);
   
       })
   
       
   });
     //get routes  getall
     router.get('/NbGroupesTotal', (req, res) => {
   
      
      Groupes.aggregate( 
       [ { $group : { _id :"Groupes", count:{$sum:1} } } ]).then(Group => {
         console.log(Group);
         res.json(Group); 
     }).catch(err => {
         console.log('error_msg', 'ERROR: ' + err);
   
       })
   
       
   });
  module.exports = router;