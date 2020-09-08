const express = require('express');
const router = express.Router();
const Enseignant = require('../models/Enseignant');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');


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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/Enseignat');
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + '-' + file.originalname )
  }
});
const upload = multer({storage: storage });
router.post("/AddEnseignant",upload.single('Image'), (req, res, next) => {
  console.log(req.file);

    const enseignant = new Enseignant({
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Email: req.body.Email,
        Motpasse: req.body.Motpasse,
        Image: req.file.path,
        Connexion: req.body.Connexion,
    });
  
 
    enseignant.save().then(createdenseignant => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createdenseignant._id
      });
    });
  });

  //get routes starts here getall
router.get('/getallEnseignant', (req, res) => {
    Enseignant.find({})
        .then(enseignant => {
            console.log(enseignant);
            res.json(enseignant);
          
        })
        .catch(err => {
            console.log('error_msg', 'ERROR: '+err);

        })

});
  //get routes  getall


// delet utilisateur
router.delete("/deleteEnseignant/:id", (req, res, next) => {
    Enseignant.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });
  //end- of delet

  //get routes by id 
router.get('/GetEnseignant/:id', (req, res) => {
    Enseignant.findById({ _id: req.params.id })
        .then(enseignant => {
            console.log(enseignant);
            res.json(enseignant);
          
        })
        .catch(err => {
            console.log('error_msg', 'ERROR: '+err);
  
        })
  
  });
    //get routes by id 
//put routes by id 
    router.put('/UpdateEnseignant/:id',upload.single('Image') ,(req, res) => {
      console.log(req.file);
    
     const enseignant = ({
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Email: req.body.Email,
        Motpasse: req.body.Motpasse,
        Image: req.file.path,
        Connexion: req.body.Connexion,
    });
      
        Enseignant.updateOne({ _id: req.params.id},enseignant, function (err, Enseignant) {
            if (err) return console.log('error_msg', 'ERROR: '+err);
      
            res.json(Enseignant);
        });
      });
//put routes by id 
//put routes by id 


//login utilisateur
router.post('/LoginEnseignant',(req, res) => {
  Enseignant.findOne({ Email: req.body.Email,Motpasse: req.body.Motpasse})
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

router.get('/EnseignantToken', verifyToken, function(req,res,next){
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