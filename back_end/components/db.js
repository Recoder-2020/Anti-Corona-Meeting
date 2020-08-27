var mysql = require("mysql");
var config = require("../config/development");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});
//module.exports.beginTransaction = function(){}s 가능?
module.exports.beginTransaction = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      else {
        connection.beginTransaction((err) => {
          if (err) reject(this.rollback(connection));
          else resolve(connection);
        });
      }
    });
  });
};

module.exports.commit = (connection) => {
  return new Promise((resolve, reject) => {
    connection.commit((err) => {
      if (err) reject(this.rollback(connection));
      else {
        connection.release();
        resolve();
      }
    });
  });
};

module.exports.rollback = (connection) => {
  return new Promise((resolve, reject) => {
    connection.rollback((err) => {
      if (err) reject(err);
      else {
        connection.release();
        resolve();
      }
    });
  });
};

module.exports.query = (options) => {
  return new Promise((resolve, reject) => {
    let connection = options.connection ? options.connection : pool;
    connection.query(
      { sql: options.sql, values: options.values },
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};
