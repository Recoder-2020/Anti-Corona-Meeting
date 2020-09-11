const db = require("../components/db");

module.exports.insert = async (options, connection) => {
  try {
    const result = await db.query({
      connection: connection,
      sql: "INSERT INTO USER SET ?",
      values: [options],
    });
    return result.insertId;
  } catch (err) {
    throw new error(err);
  }
};

module.exports.findByInfo = async (idx, id) => {
  try {
    return await db.query({
      sql: "SELECT * FROM USER WHERE ROOM_IDX = ? AND ID = ?",
      values: [idx, id],
    });
  } catch (err) {
    throw new error(err);
  }
};

module.exports.getList = async (options) => {
  let whereClause = ``;
  const { IDX, ROOM_IDX, ID } = options;
  if (IDX) whereClause += `IDX = ${IDX} AND `;
  if (ROOM_IDX) whereClause += `ROOM_IDX = ${ROOM_IDX} AND `;
  if (ID) whereClause += `ID = ${ID} AND `;

  try {
    return await db.query({
      sql: `SELECT * FROM USER WHERE ${whereClause}1=1`,
    });
  } catch (err) {
    throw new error(err);
  }
};

module.exports.update = async (options, connection) => {
  try {
    return await db.query({
      connection: connection,
      sql: "UPDATE USER SET ? WHERE IDX = ?",
      values: [options, options.IDX],
    });
  } catch (err) {
    throw new error(err);
  }
};

module.exports.delete = async (options, connection) => {
  try {
    const { affectedRows } = await db.query({
      connection,
      sql: `DELETE FROM USER WHERE IDX = ?`,
      values: [options],
    });
    return affectedRows;
  } catch (err) {
    throw new Error(err);
  }
};
