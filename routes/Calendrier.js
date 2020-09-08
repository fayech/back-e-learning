const express = require('express');
const router = express.Router();
const Calendrire = require('../models/calendrier');

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

router.post("/AddCalendrire", (req, res, next) => {
    const calendrire = new Calendrire({
        Title:   req.body.Title,
        Color: req.body.Color,
        Group: req.body.Group,
      start_date:   req.body.start_date,
      end_date:   req.body.end_date,
    
    });
    calendrire.save().then(createdCalendrire => {
      res.status(201).json({
        message: "Post added event successfully",
        postId: createdCalendrire._id
      });
    });
  });

  //get routes starts here getall
  router.get('/getAllCalendrire', (req, res) => {
    Calendrire.find({})
        .then(calendrire => {
            console.log(calendrire);
            res.json(calendrire);
          
        })
        .catch(err => {
            console.log('error_msg', 'ERROR: '+err);

        })

});
  //get routes  getall
  
  router.delete("/deleteCalendrire/:id", (req, res, next) => {
    Calendrire.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });
  
module.exports = router;