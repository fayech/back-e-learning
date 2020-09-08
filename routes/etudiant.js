const express = require('express');
const router = express.Router();
const Etudiant = require('../models/Etudiant');
const multer = require('multer');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var transporter = nodemailer.createTransport({
  secure: false, // use SSL  *
  tls: {     rejectUnauthorized: false },
  secure: true,
  service: 'gmail',
  auth: {
    user: 'meliodayo',
    pass: 'azer123456'
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/Etudiant');
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

router.post("/Etudiantadd", upload.single('Image'), (req, res, next) => {
  console.log(req.file);
  const etudiant = new Etudiant({
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Email: req.body.Email,
    Motpasse: req.body.Motpasse,
    Image: req.file.path,
    Niveau: req.body.Niveau,
    Connexion: req.body.Connexion,
  });
  var mailOptions = {
    from: 'meliodayo@gmail.com',
    to: req.body.Email,
    subject: 'your IHEC Account',
    html: 'Congratulation , your IHEC official account has been created :<br>Email :' +req.body.Email+
    '<br> Password :'+req.body.Motpasse
  };
  
  

  etudiant.save().then(createdetudiant => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdetudiant._id
    });
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
});

//get routes starts here getall
router.get('/getallEtudiant', (req, res) => {
  Etudiant.find({})
    .then(etudiant => {
      console.log(etudiant);
      res.json(etudiant);

    })
    .catch(err => {
      console.log('error_msg', 'ERROR: ' + err);

    })

});
//get routes  getall


// delet utilisateur
router.delete("/deleteEtudiant/:id", (req, res, next) => {
  Etudiant.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});
//end- of delet

//get routes by id 
router.get('/GetEtudiant/:id', (req, res) => {
  Etudiant.findById({ _id: req.params.id })
    .then(etudiant => {
      console.log(etudiant);
      res.json(etudiant);

    })
    .catch(err => {
      console.log('error_msg', 'ERROR: ' + err);

    })

});
//get routes by id 
//put routes by id 
router.put('/UpdateEtudiant/:id',upload.single('Image'),(req, res) => {
  console.log(req.file);
  const etudiant = ({
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Email: req.body.Email,
    Motpasse: req.body.Motpasse,
    Image: req.file.path,
    Niveau: req.body.Niveau,
    Connexion: req.body.Connexion,
  });
  console.log(etudiant);
  Etudiant.updateOne({ _id: req.params.id},etudiant,function(err, Etudiant) {
    if (err) return console.log('error_msg', 'ERROR: ' + err);

    res.json(Etudiant);
  });
});
//put routes by id 
// login etudiant
router.post('/LoginEtudiant',(req, res) => {
  Etudiant.findOne({ Email: req.body.Email,Motpasse: req.body.Motpasse})
  .then(etudiant => {
    if(etudiant==null){
      return res.status(501).json({message:'User email is not registered.'})

    }else{
      let token = jwt.sign({token:etudiant},'secret', {expiresIn : '3h'});
     return res.status(200).json(token);

    // return res.json({token});
    }
     
  })
  .catch(err => {
      console.log('error_msg', 'ERROR: '+err);

  })
});
//end-of login etudiant
//end-of 


router.get('/EtudiantToken', verifyToken, function(req,res,next){
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


//get routes by id 
router.post('/EmailEtudiant', (req, res) => {
  let getedUser;

  Etudiant.findOne({ Email: req.body.Email })
    .then(etudiant => {
      getedUser = etudiant;
         console.log(getedUser.Nom);
         var mailOptions = {
          from: 'meliodayo@gmail.com',
          to: getedUser.Email,
          subject: 'your IHEC Account',
          html: ' You forgot your password , below you find your details : Account:<br>Email :' +getedUser.Email+
          '<br> password :'+getedUser.Motpasse
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.status(201).json({
              message: "Post added successfully",
             
            });
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.status(200);
    })
    .catch(err => {
      console.log('error_msg', 'ERROR: ' + err);

    })

});

module.exports = router;