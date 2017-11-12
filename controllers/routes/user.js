const mongoose = require('mongoose');
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
  var newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.json({"error": err});
    } else {
      res.json(makeJsonResponse(user));
    }
  });
}

// GET a users
function getUser(req, res) {
  if (req.query.id) {
    User.findById(req.query.id, (err, user) => {
      if (err) {
        res.json({"error": err});
      } else {
        res.json(makeJsonResponse(user));
      }
    });
  } else if (req.query.email) {
    User.findOne({"email": req.query.email}, (err, user) => {
      if (err) {
        res.json({"error": err});
      } else {
        res.json(makeJsonResponse(user));
      }
    });
  } else {
    res.json({"error": "Get should specify an id or email"});
  }
}

// PUT an updte to a user
function updateUser(req, res) {
  if (req.query.id) {
    User.findById({_id: req.query.id}, (err, user) => {
      if (err) {
        res.json({"error": err});
      } else {
        Object.assign(user, req.body).save((err, user) => {
          if (err) {
            res.json({"error": err});
          } else {
            res.json({"message": "User updated", user});
          }
        });

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
        res.json({"error": err});
      } else {
        res.json({"message": "User deleted"});
      }
    });
  } else {
    res.json({"error": "Delete should specify an id"});
  }
}

module.exports = { postUser, getUser, updateUser, deleteUser };
