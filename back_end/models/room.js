const db = require("../components/db");

module.exports.insert = async (options, connection) => {
  try {
    const result = await db.query({
      connection: connection,
      sql: "INSERT INTO ROOMS SET ?",
      values: [options],
    });
    return result.insertId;
  } catch (err) {
    throw new error(err);
  }
};

module.exports.update = async (options, connection) => {
  try {
    return await db.query({
      connection: connection,
      sql: "UPDATE ROOMS SET ? WHERE IDX = ?",
      values: [options, options.IDX],
    });
  } catch (err) {
    throw new error(err);
  }
};

module.exports.findByIdx = async (options) => {
  try {
    let sql = `SELECT R.*, U.IDX AS USER_IDX, U.ID AS USER_ID, U.TYPE AS USER_TYPE
    FROM ROOMS AS R JOIN USER AS U ON R.IDX = U.ROOM_IDX 
    WHERE R.IDX = ${options} AND U.TYPE = "admin"`;
    const result = await db.query({
      sql: sql,
    });
    return result[0];
  } catch (err) {
    throw new error(err);
  }
};

module.exports.findByCode = async (options) => {
  try {
    let sql = "SELECT * FROM ROOMS WHERE ROOM_CODE = ?";
    return await db.query({
      sql: sql,
      values: [options],
    });
  } catch (err) {
    throw new error(err);
  }
};

module.exports.getList = async () => {
  try {
    let sql = "SELECT * FROM ROOMS";
    return await db.query({
      sql: sql,
    });
  } catch (err) {
    throw new error(err);
  }
};
