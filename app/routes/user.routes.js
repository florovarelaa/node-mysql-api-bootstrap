const express = require('express');
let router = express.Router();

const users = require("../controllers/user.controller.js");

// create a new user
router.post("/users", users.create);

// retrieve all users
router.get("/users", users.findAll);

// retrieve a single user with id_user
router.get("/users/:id_user", users.findById);

// update a user with id_user
router.put("/users/:id_user", users.updateById);

// delete a user with id_user
router.delete("/users/:id_user", users.delete);

// delete all users
router.delete("/users", users.deleteAll);

module.exports = router;