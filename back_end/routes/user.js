const express = require("express");
const router = express.Router();
const db = require("../components/db");
const roomModel = require("../models/room");
const userModel = require("../models/user");
const crypto = require("../components/crypto");

//유저 입장(회원가입과 같은 기능)
router.post("/join", async function (req, res, next) {
  const connection = await db.beginTransaction();
  try {
    const newUser = req.body;

    const roomChk = await roomModel.findByCode(newUser.ROOM_CODE);
    if (roomChk.length === 0) {
      throw { status: 404, errorMessage: "Not Found RoomCode" };
    }

    const userChk = await userModel.findByInfo(roomChk[0].IDX, newUser.ID);
    if (userChk.length > 0) {
      throw { status: 409, errorMessage: "Duplicate User Id" };
    }

    delete newUser.ROOM_CODE;
    newUser.ROOM_IDX = roomChk[0].IDX;
    newUser.TYPE = "user";
    const insertIdx = await userModel.insert(newUser, connection);
    await db.commit(connection);
    res.status(200).json({ insertIdx, newUser });
  } catch (err) {
    console.log("err : ", err);
    await db.rollback(connection);
    next(err);
  }
});

//유저 입장(로그인과 같은 기능)
router.post("/rejoin", async function (req, res, next) {
  const connection = await db.beginTransaction();
  try {
    const newUser = req.body;

    const roomChk = await roomModel.findByCode(newUser.ROOM_CODE);
    if (roomChk.length === 0) {
      throw { status: 404, errorMessage: "Not Found RoomCode" };
    }

    const userChk = await userModel.findByInfo(roomChk[0].IDX, newUser.ID);
    if (userChk.length === 0) {
      throw { status: 409, errorMessage: "Not Found Id" };
    }
    userChk[0].ROOM_CODE = newUser.ROOM_CODE;
    const result = userChk[0];
    await db.commit(connection);
    res.status(200).json(result);
  } catch (err) {
    console.log("err : ", err);
    await db.rollback(connection);
    next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const result = await userModel.getList({});
    res.status(200).json(result);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.get("/idx/:IDX", async function (req, res, next) {
  try {
    const IDX = req.params.IDX;
    const result = await userModel.getList({ IDX });
    res.status(200).json(result[0]);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.get("/roomIdx/:ROOM_IDX", async function (req, res, next) {
  try {
    const ROOM_IDX = req.params.ROOM_IDX;
    const result = await userModel.getList({ ROOM_IDX });
    res.status(200).json(result);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.put("/location/:IDX", async function (req, res, next) {
  const connection = await db.beginTransaction();
  try {
    const idx = req.params.IDX;
    const location = req.body;
    location.IDX = idx;
    const result = await userModel.update(location, connection);
    await db.commit(connection);
    res.status(200).json({ result: true });
  } catch (err) {
    console.log("err : ", err);
    await db.rollback(connection);
    next(err);
  }
});

router.delete("/idx/:IDX", async function (req, res, next) {
  const connection = await db.beginTransaction();
  try {
    const idx = req.params.IDX;
    const result = await userModel.delete(idx, connection);
    await db.commit(connection);
    res.status(200).json({ result: true });
  } catch (err) {
    await db.rollback(connection);
    next(err);
  }
});

module.exports = router;
