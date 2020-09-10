const express = require("express");
const router = express.Router();
const db = require("../components/db");
const roomModel = require("../models/room");
const userModel = require("../models/user");
const crypto = require("../components/crypto");

//방 생성
router.post("/createRoom", async function (req, res, next) {
  const connection = await db.beginTransaction();
  try {
    const newRoom = req.body;
    const newUser = {
      ID: req.body.ID,
      TYPE: "admin",
    };
    delete newRoom.ID;
    delete newRoom.USER_TYPE;

    const roomIdx = await roomModel.insert(newRoom, connection);
    const roomCode = await crypto.createRandomRoomCode(JSON.stringify(roomIdx));
    const updateResult = await roomModel.update(
      {
        ROOM_CODE: roomCode.roomCode,
        IDX: roomIdx,
      },
      connection
    );
    newUser.ROOM_IDX = roomIdx;
    const userResult = await userModel.insert(newUser, connection);
    await db.commit(connection);
    res.status(200).json({ roomIdx, updateResult, userResult });
  } catch (err) {
    console.log("err : ", err);
    await db.rollback(connection);
    next(err);
  }
});

//특정 방 정보
router.get("/getRoomInfo/:IDX", async function (req, res, next) {
  try {
    const idx = req.params.IDX;
    console.log("didix : ", idx);
    const roomInfo = await roomModel.findByIdx(idx);
    console.log("result : ", roomInfo);
    res.status(200).json({ roomInfo });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

//모든 방 정보
router.get("/getRoomInfo", async function (req, res, next) {
  try {
    const roomInfo = await roomModel.getList();
    res.status(200).json(roomInfo);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

//방, 방장 정보 수정
router.put("/updateRoomInfo", async function (req, res, next) {
  const connection = await db.beginTransaction();
  try {
    const newUser = { IDX: req.body.USER_IDX, ID: req.body.ID };
    const newRoom = req.body;
    delete newRoom.USER_IDX;
    delete newRoom.ID;

    const roomResult = await roomModel.update(newRoom, connection);
    const userResult = await userModel.update(newUser, connection);
    await db.commit(connection);
    res.status(200).json({ result: true });
  } catch (err) {
    console.log("err : ", err);
    await db.rollback(connection);
    next(err);
  }
});
module.exports = router;
