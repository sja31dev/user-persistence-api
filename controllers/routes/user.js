const mongoose = require('mongoose');
var Isemail = require('isemail');

const User = require('../models/user');

function makeJsonResponse(user) {
  return ({
    "id": user._id,
    "email": user.email,
    "forename": user.forename,
    "surname": user.surname,
    "created": user.created
  });
}

// POST a new user
function postUser(req, res) {
  if (req.body.email && !Isemail.validate(req.body.email))
  {
    res.json({"error": "Invalid email address"});
  } else {
    var newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        res.json(err);
      } else {
        res.json(makeJsonResponse(user));
      }
    });
  }
}

// GET a users
function getUser(req, res) {
  if (req.query.id) {
    User.findById(req.query.id, (err, user) => {
      if (err) {
        res.json(err);
      } else {
        res.json(makeJsonResponse(user));
      }
    });
  } else if (req.query.email) {
    User.findOne({"email": req.query.email}, (err, user) => {
      if (err) {
        res.json(err);
      } else {
        res.json(makeJsonResponse(user));
      }
    });
  } else {
    // Get all users
    User.find({}, (err, users) => {
      if (err) {
        res.json(err);
      } else {
        res.json(users.map((user) => { return makeJsonResponse(user); }));
      }
    });
  }
}

// PUT an updte to a user
function updateUser(req, res) {
  if (req.query.id) {
    User.findById({_id: req.query.id}, (err, user) => {
      if (err) {
        res.json(err);
      } else {
        if(user) {
          Object.assign(user, req.body).save((err, user) => {
            if (err) {
              res.json(err);
            } else {
              res.json(makeJsonResponse(user));
            }
          });
        } else {
          res.json({"error": "User not found"});
        }
      }
    });
  } else {
    res.json({"error": "Update should specify an id"});
  }
}

// DELETE a user
function deleteUser(req, res) {
  if (req.query.id) {
    User.remove({_id : req.query.id}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json({"message": "User deleted"});
      }
    });
  } else {
    res.json({"error": "Delete should specify an id"});
  }
}

module.exports = { postUser, getUser, updateUser, deleteUser };
