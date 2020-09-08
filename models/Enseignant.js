const mongoose = require('mongoose');


let enseignantScheme = new mongoose.Schema({
    Nom:   String,
  Prenom:   String,
  Email:   String,
  Motpasse:  String,
  Image: String,
  Connexion: Boolean
});

module.exports = mongoose.model('Enseignant',enseignantScheme);