const mongoose = require('mongoose');


let utilisateurScheme = new mongoose.Schema({
    Nom:   String,
  Prenom:   String,
  Email:   String,
  Motpasse:  String,
  type_role: String,

});

module.exports = mongoose.model('Utilisateur',utilisateurScheme);