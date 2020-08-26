// const express = require("express");
// const router = express.Router();
// const db = require("../components/db");
// const model = require("../models/users");
// const JWT = require("../libs/jwt/index");
// const crypto = require("../components/crypto");

// router.post("/signup", async function (req, res, next) {
//   try {
//     //console.log("body : ", req.body);
//     const connection = await db.beginTransaction();
//     const userCheck = await model.getList({ id: req.body.id });
//     if (userCheck.length > 0) {
//       //res.status(409).json({ err: "Duplicate id" });
//       throw { status: 409, errorMessage: "Duplicate userId" };
//     }
//     const { salt, encodedPw } = crypto.createPasswordPbkdf2(req.body.pwd);
//     console.log("salt : ", salt);
//     console.log("encodedPw : ", encodedPw);
//     req.body.pwd = encodedPw;
//     req.body.salt = salt;
//     const result = await model.insert(connection, req.body);
//     const token = await JWT.createToken({
//       name: req.body.id,
//       idx: result.insertId,
//     });
//     //console.log("token : ", token);
//     const updateResult = await model.update(connection, {
//       option: { token: token.accessToken },
//       idx: result.insertId,
//     });
//     await db.commit(connection);
//     res.status(200).json({ c: updateResult });
//   } catch (err) {
//     console.log("err : ", err);
//     await db.rollback(connection);
//     next(err);
//   }
// });

// router.post("/signin", async function (req, res, next) {
//   try {
//     const connection = await db.beginTransaction();
//     const loginUser = req.body;
//     const result = await model.getList({ id: loginUser.id });
//     if (result.length == 0) {
//       throw { status: 404, errorMessage: "User not found" };
//     }
//     const encodedPw = crypto.getPasswordPbkdf2(loginUser.pwd, result[0].salt);
//     if (result[0].pwd !== encodedPw) {
//       throw { status: 401, errorMessage: "Invaild password" };
//     }
//     const token = await JWT.createToken({
//       idx: result[0].idx,
//       name: result[0].id,
//     });
//     const results = await model.update(connection, {
//       option: { token: token.accessToken },
//       idx: result[0].idx,
//     });
//     loginUser.token = token.accessToken;
//     delete loginUser.pwd;
//     //const result2 = await model.getList({ id: loginUser.id });
//     //console.log("result2 : ", result2); 최신화된 token이 왜 안나오는지 잘 모르겠음
//     await db.commit(connection);
//     res.status(200).json({ result: loginUser });
//   } catch (err) {
//     console.log("err : ", err);
//     await db.rollback(connection);
//     next(err);
//   }
// });

// router.put("/", async function (req, res, next) {
//   try {
//     const connection = await db.beginTransaction();
//     //console.log("header : ", req.headers);
//     const jwtToken = await JWT.decodeToken(req.headers.authorization);
//     let originUser = await model.getList({ idx: jwtToken.sub });
//     const authorization = `Bearer ${originUser[0].token}`;
//     if (authorization !== req.headers.authorization) {
//       //res.status(401).json({ err: "Invalid token" });
//       throw { status: 401, errorMessage: "Invalid token" };
//     }
//     const result = await model.update(connection, {
//       option: req.body,
//       idx: jwtToken.sub,
//     });
//     await db.commit(connection);
//     if (result) res.status(200).json({ result: result });
//   } catch (err) {
//     console.log("err : ", err);
//     await db.rollback(connection);
//     next(err);
//   }
// });

// router.get("/", async function (req, res, next) {
//   try {
//     const options = req.query;
//     //console.log("options : ", options);
//     const result = await model.getList(options);
//     //console.log(result);
//     res.status(200).json(result);
//   } catch (err) {
//     console.log("err : ", err);
//     next(err);
//   }
// });

// module.exports = router;
