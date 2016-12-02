var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Secret = require('../models/secret');
var bodyParser = require('body-parser');


router.get("/", function(req, res){
  var userEmail = req.decodedToken.email;
  // Check the user's level of permision based on their email
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if(user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        // Based on the clearance level of the individual, give them access to different information
        Secret.find({ secrecyLevel: { $lte: user.clearanceLevel } }, function (err, secrets){
          if (err) {
            console.log('Error COMPLETING secrecyLevel query task', err);
            res.sendStatus(500);
          } else {
            // return all of the results where a specific user has permission
            res.send(secrets);
          }
        });
      }
    }
  });
});

router.post("/", function(req, res){
  var userEmail = req.decodedToken.email;
  var newUser = req.body;
  // Check the user's level of permision based on their email
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if(user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('Cannot post new user with this email. Existing user does not exist ', req.decodedToken.email);
        res.sendStatus(403);
        //compare clearance levels of old and new user
      } else if (newUser.clearanceLevel > user.clearanceLevel) {
        console.log('Cannot post new user with higher clearance than existing user');
      } else {
        // Based on the clearance level of the individual, give them access to different information
        //create new user via Schema
        var NewUser = new User(req.body)
        console.log('THIS IS THE NEWUSER ', NewUser);
        NewUser.save({ clearanceLevel: newUser.clearanceLevel, email: newUser.email  }, function (err){
          if (err) {
            console.log('Error COMPLETING secrecyLevel query task', err);
            res.sendStatus(500);
          } else {
            // return all of the results where a specific user has permission
            console.log('sucessfully posted new user');
            res.sendStatus(201);
          }
        });
      }
    }
  });
});


module.exports = router;
