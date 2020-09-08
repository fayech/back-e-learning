const mongoose = require('mongoose');


let GroupesScheme = new mongoose.Schema({
    Nom:   String,
  nom_E:   String,
  Niveau:   String,
});

module.exports = mongoose.model('Groupes',GroupesScheme);