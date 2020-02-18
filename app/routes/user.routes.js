const express = require('express');
let router = express.Router();

const users = require("../controllers/user.controller.js");

// create a new user
router.post("/users", users.create);

// retrieve all users
router.get("/users", users.findAll);

// retrieve a single user with userId
router.get("/users/:userId", users.findOne);

// update a user with userId
router.put("/users/:userId", users.update);

// delete a user with userId
router.delete("/users/:userId", users.delete);

// delete all users
router.delete("/users", users.deleteAll);

module.exports = router;