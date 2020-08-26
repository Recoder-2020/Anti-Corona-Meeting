const localStorage = require("passport-local");
const axios = require("axios");
const qs = require("querystring");

module.exports = (passport) => {
  passport.use(
    new localStorage(
      {
        usernameField: "ID",
        passwordField: "PASSWORD",
      },
      async (ID, PASSWORD, done) => {
        try {
          const apiUrl = `${process.env.API_URL}/user/signIn`;
          //console.log("apiurl", apiUrl);
          const payload = {
            ID: ID,
            PASSWORD: PASSWORD,
          };
          await axios
            .post(apiUrl, qs.stringify(payload))
            .then((response) => {
              const result = response.data;
              //console.log("result", result);
              if (result) {
                done(null, result);
              }
            })
            .catch((err) => {
              // console.error('localstorageFailed',err.response.data)
              done(null, false, { message: err.response.data.errorMessage });
            });
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
