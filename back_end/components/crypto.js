const crypto = require("crypto");

module.exports.createPasswordPbkdf2 = (pw) => {
  const salt = crypto.randomBytes(32).toString("base64");
  const encodedPw = crypto
    .pbkdf2Sync(pw, salt, 99381, 32, "sha512")
    .toString("base64");
  //변수 의미 : 암호, 암호의 기준이 되는 키, 해쉬를 진행하는 반복 횟수, 데이터 길이,
  return { encodedPw, salt };
};

module.exports.getPasswordPbkdf2 = (pw, salt) => {
  return crypto.pbkdf2Sync(pw, salt, 99381, 32, "sha512").toString("base64");
};

module.exports.createRandomRoomCode = (roomIdx) => {
  const salt = crypto.randomBytes(32).toString("base64");
  const roomCode = crypto
    .pbkdf2Sync(roomIdx, salt, 99381, 8, "sha512")
    .toString("base64");
  return { roomCode, roomIdx };
};
