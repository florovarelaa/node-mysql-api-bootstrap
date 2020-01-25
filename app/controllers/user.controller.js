const User = require('../models/user.model.js');

// Create and cave a new user
exports.create = (req, res) => {
  
  // validate request
  if (!req.body) {
      res.status(400).send({
          message: 'content can not be empty!'
      })
  };

  // create a user
  const user = new User({
    username: req.body.username,
    pass: req.body.pass,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  // save user in database
  User.create(user, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || 'An error ocurred when creating the User.'
          });
      } else {
          res.send(data);
      }
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.getAll( (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || 'An error ocurred while retrieving Users.'
        })
    } else {
        res.send(data);
    }
  })
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.userId
          });
        }
      } else {
          res.send(data);
      }
    }
  );
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.params.userId
            });
          }
        } else {
            res.send({ message: `User was deleted successfully!` });
        }
      });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        else {
            res.send({ message: `All Users were deleted successfully!` });
        }
      });
};