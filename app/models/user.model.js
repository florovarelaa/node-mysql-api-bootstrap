const sql = require('./db.js');

//constructor
const User = function(user) {
    this.username = user.username,
    this.pass = user.pass,
    this.firstName = user.firstName,
    this.lastName = user.lastName,
    this.email = user.email
};

User.create = (newUser, result) => {
    sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) {
            console.log('error', err);
            result(err, null);
            return;
        }

        console.log('created user: ', {id: res.insertId, ...newUser });
        result(null, {id: res.insertId, ...newUser });
    })
}

User.findById = (id_user, result) => {
    sql.query(`SELECT * FROM users WHERE id_user = ${id_user}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };
  
  User.updateById = (id_user, user, result) => {
    sql.query(
      `UPDATE users 
      SET
        username = ?,
        firstname = ?,
        lastname = ?,
        email = ?
      WHERE id_user = ${id_user}
      `,
      [user.username, user.firstname, user.lastname, user.email],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };
  
  User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
  
  User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
  
  module.exports = User;