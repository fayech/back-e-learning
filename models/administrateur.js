const mongoose = require('mongoose');


let administrateurScheme = new mongoose.Schema({
  Nom:   String,
  Email:   String,
  Numero:   Number,
  Motpasse:  String,
  Image: String, 
  Connexion: Boolean,
 
});

module.exports = mongoose.model('Administrateur',administrateurScheme);