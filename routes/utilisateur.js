const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');
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
router.post("/AddUtilisateur", (req, res, next) => {
    const utilisateur = new Utilisateur({
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Email: req.body.Email,
        Motpasse: req.body.Motpasse,
        type_role: req.body.type_role,
    });
    utilisateur.save().then(createdUtilisateur => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createdUtilisateur._id
      });
    });
  });

  //get routes starts here getall
router.get('/AllUtilisateur', (req, res) => {
    Utilisateur.find({})
        .then(utilisateur => {
            console.log(utilisateur);
            res.json(utilisateur);
          
        })
        .catch(err => {
            console.log('error_msg', 'ERROR: '+err);

        })

});
  //get routes  getall
  


// delet utilisateur
router.delete("/deleteUtilisateur/:id", (req, res, next) => {
    Utilisateur.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });
  //end- of delet

  //get routes by id 
router.get('/GetUtilisateur/:id', (req, res) => {
    Utilisateur.findById({ _id: req.params.id })
        .then(utilisateur => {
            console.log(utilisateur);
            res.json(utilisateur);
          
        })
        .catch(err => {
            console.log('error_msg', 'ERROR: '+err);
  
        })
  
  });
    //get routes by id 
//put routes by id 
    router.put('/UpdateUtilisateur/:id', (req, res) => {
        let searchQuery = {_id : req.params.id};
      
        Utilisateur.updateOne(searchQuery,req.body, function (err, Utilisateur) {
            if (err) return console.log('error_msg', 'ERROR: '+err);
      
            res.json(Utilisateur);
        });
      });
//put routes by id
//sign in 
//login utilisateur
router.post('/LoginUtilisateur',(req, res) => {
  Utilisateur.findOne({ Email: req.body.Email,Motpasse: req.body.Motpasse})
  .then(utilisateur => {
    if(utilisateur==null){
      return res.status(501).json({message:'User email is not registered.'})

    }else{
      let token = jwt.sign({token:utilisateur},'secret', {expiresIn : '3h'});
     return res.status(200).json(token);

    // return res.json({token});
    }
     
    
  })
  .catch(err => {
      console.log('error_msg', 'ERROR: '+err);

  })
});
//login utilisateur
//sign in 
router.get('/UtilisateurToken', verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken.token);
})
var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

  module.exports = router;