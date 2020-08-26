const db = require("../components/db");

module.exports.insert = async (connection, options) => {
  try {
    return await db.query({
      connection: connection,
      sql: "insert into users set ?",
      values: [options],
    });
  } catch (err) {
    throw new error(err);
  }
};

module.exports.update = async (connection, options) => {
  try {
    return await db.query({
      connection: connection,
      sql: "update users set ? where idx = ?",
      values: [options.option, options.idx],
    });
  } catch (err) {
    throw new error(err);
  }
};

module.exports.getList = async (options) => {
  try {
    let sql = "select * from users";
    let value;
    if (options.idx) {
      sql += " where idx = ?";
      value = options.idx;
    } else if (options.id && options.pwd) {
      sql += " where id = ? and pwd = ?";
      value = [options.id, options.pwd];
    } else if (options.id) {
      sql += " where id = ?";
      value = options.id;
    }
    return await db.query({
      sql: sql,
      values: value,
    });
  } catch (err) {
    throw new error(err);
  }
};
