const local = require("./localStrategy");
const axios = require("axios");
//const users = require("./users.json");
const qs = require("querystring");

module.exports = (passport) => {
  //로그인 시에만 실행, 세션에 저장
  passport.serializeUser((user, done) => {
    // console.log("user", user.IDX);
    done(null, user.IDX);
  });
  // 매 요청 시 실행, passport.session 미들웨어가 호출
  passport.deserializeUser(async (user, done) => {
    const apiUrl = `${process.env.API_URL}/user/search?IDX=${user}`;
    await axios
      .get(apiUrl)
      .then((response) => {
        const user = response.data.result2[0];
        //console.log("user", user);
        if (user) {
          done(null, user);
        }
      })
      .catch((err) => {
        // console.error('localstorageFailed',err.response.data)
        done(null, false, { message: err.response.data.errorMessage });
      });
  });

  local(passport);
};
