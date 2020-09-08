const express = require('express');
const router = express.Router();
const Groupes = require('../models/Groupes');
const Etudiant = require('../models/Etudiant');
const Document = require('../models/Document');

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
  router.get('/infoEtudiant/:Niveau', (req, res) => {
    Niveau=req.params.Niveau;
console.log(Niveau);
Etudiant.aggregate([
    { $lookup:
       {
         from: 'groupes',
         localField: 'Niveau',
         foreignField: 'Niveau',
         as: 'details'
       }
     },

     { $match : { Niveau : Niveau } },

    ]).then(Group => {
        console.log(Group);
        res.json(Group); 
    }).catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
  
      
  });
  //get routes  getall

  //get routes starts here getall
  router.get('/infoGroup/:Niveau', (req, res) => {
    Niveau=req.params.Niveau;
console.log(Niveau);
Groupes.aggregate([
    { $lookup:
       {
         from: "documents",
         localField: 'Nom',
         foreignField: 'nom_Groupe',
         as: 'details'
       }
     },

     { $match : { Niveau : Niveau } },

    ]).then(Group => {
        console.log(Group);
        res.json(Group); 
    }).catch(err => {
        console.log('error_msg', 'ERROR: ' + err);
  
      })
  
  
      
  });
  //get routes  getall

//get routes starts here getall
router.get('/DetailsGroup/:id', (req, res) => {
  id=req.params.id;
console.log(id);

Document.aggregate([
  { $lookup:
     {
       from: "groupes",
       localField: 'nom_Groupe',
       foreignField: 'Nom',
       as: 'details'
     }
   },
   { $match : { _id : id } },


  ]).then(Group => {
      console.log(Group);
      res.json(Group); 
  }).catch(err => {
      console.log('error_msg', 'ERROR: ' + err);

    })


    
});
//get routes  getall
    //get routes starts here getall
    router.get('/infoEnseignant/:nom_E', (req, res) => {
      nom_E=req.params.nom_E;
  console.log(nom_E);
  Groupes.aggregate([
      { $lookup:
         {
           from: "documents",
           localField: 'Nom',
           foreignField: 'nom_Groupe',
           as: 'details'
         }
       },
  
       { $match : { nom_E : nom_E } },
  
      ]).then(Group => {
          console.log(Group);
          res.json(Group); 
      }).catch(err => {
          console.log('error_msg', 'ERROR: ' + err);
    
        })
    
    
        
    });
    //get routes  getall
 module.exports = router;