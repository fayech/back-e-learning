const mongoose = require('mongoose');


let calendrierScheme = new mongoose.Schema({
    Title:   String,
    Color: String,
    Group: String,
  start_date:   Date,
  end_date:   Date,

});

module.exports = mongoose.model('Calendrier',calendrierScheme);