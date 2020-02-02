// i suggest you also add this route to an entry file, like index.js, so you import everything  from there
module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // create a new user
    app.post("/users", users.create);
  
    // retrieve all users
    app.get("/users", users.findAll);
  
    // retrieve a single user with userId
    app.get("/users/:userId", users.findOne);
  
    // update a user with userId
    app.put("/users/:userId", users.update);
  
    // delete a user with userId
    app.delete("/users/:userId", users.delete);
  
    // delete all users
    app.delete("/users", users.deleteAll);
};