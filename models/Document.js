const mongoose = require('mongoose');


let DocumentScheme = new mongoose.Schema({
    Nom:   String,
    url: String,
  nom_Groupe:   String,
});

module.exports = mongoose.model('Document',DocumentScheme);