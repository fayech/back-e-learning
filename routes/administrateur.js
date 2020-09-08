const express = require('express');
const router = express.Router();
const Administrateur = require('../models/administrateur');
const multer = require('multer');
const jwt = require('jsonwebtoken');


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
    cb(null, './uploads/Admin');
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + '-' + file.originalname )
  }
});
const upload = multer({storage: storage });



  router.post("/AddAdmin",upload.single('Image'), (req, res, next) => {
    console.log(req.file);

    const administrateur = new Administrateur({
        Nom: req.body.Nom,
        Email: req.body.Email,
        Numero: req.body.Numero,
        Motpasse: req.body.Motpasse,
        Image: req.file.path

    });
    administrateur.save().then(createdAdmin => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createdAdmin._id
      });
    });
  });

router.post('/administrateur', (req, res) => {
    let newadministrateur = {
        Nom: req.body.Nom,
        Email: req.body.Email,
        Numero: req.body.Numero,
        Motpasse: req.body.Motpasse,
        Image :   req.body.Image,
        Connexion: req.body.Connexion
    };
   
//req.query
//req.body(install body-parser)
//console.log(req.header)
//req.params//:id
    Administrateur.create(newadministrateur)
        .then(administrateur => {
            console.log('yes');

        })
        .catch(err => {
            console.log('error_msg', 'ERROR: '+err);

        });
});



router.put('/UpdateAdmin/:id', (req, res) => {
  let searchQuery = {_id : req.params.id};

  Administrateur.updateOne(searchQuery,req.body, function (err, Administrateur) {
      if (err) return console.log('error_msg', 'ERROR: '+err);

      res.json(Administrateur);
  });
});




  router.get('/AllAdmin', (req, res) => {
    Administrateur.find({})
        .then(administrateur => {
            console.log(administrateur);
            res.json(administrateur);
          
        })
        .catch(err => {
            console.log('error_msg', 'ERROR: '+err);

        })

});
  //get routes  getall

router.delete("/deleteAdmin/:id", (req, res, next) => {
  Administrateur.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

//get routes starts here
router.get('/GetAdmin/:id', (req, res) => {
  Administrateur.findById({ _id: req.params.id })
      .then(administrateur => {
          console.log(administrateur);
          res.json(administrateur);
        
      })
      .catch(err => {
          console.log('error_msg', 'ERROR: '+err);

      })

});


//login utilisateur
router.post('/LoginUtilisateur',(req, res) => {
  Administrateur.findOne({ Email: req.body.Email,Motpasse: req.body.Motpasse})
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