const mongoose = require('mongoose');


let  ClasseScheme = new mongoose.Schema({
    Nom:   String,
   Niveau:   String,
  
});

module.exports = mongoose.model('Classe', ClasseScheme);