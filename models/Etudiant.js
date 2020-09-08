const mongoose = require('mongoose');


let etudiantScheme = new mongoose.Schema({
    Nom:   String,
  Prenom:   String,
  Email:   String,
  Motpasse:  String,
  Image: String,
  Niveau:   String,
  Connexion: Boolean
});

module.exports = mongoose.model('Etudiant',etudiantScheme);