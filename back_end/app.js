const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passportConfig = require("./passport");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
dotenv.config();
//passportConfig(passport);

//swagger setting
const swaggerDefinition = {
  info: {
    title: "Recoder Server API",
    version: "1.0.0",
    description: "API description",
  },
  host: "localhost:3000",
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./schemas/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
//swagger end

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || "3000");

//production env
if (process.env.NODE_ENV === "production") {
  //helmet, hpp사용
  console.log("ENV : ", process.env.NODE_ENV);
} else {
  console.log("ENV : local");
}

//middlewares
app.use(cors());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// app.use(cookieParser(process.env.COOKIE_SECRET));
// const sessionStoreOption = {
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   clearExpired: true,
//   endConnectionOnClose: true,
//   checkExpirationInterval: 3600000,
//   expiration: 3600000,
//   createDatabaseTable: true,
//   charset: "utf8_general_ci",
//   schema: {
//     tableName: "SESSION_ADMIN",
//     columnNames: {
//       session_id: "session_id",
//       expires: "expires",
//       data: "data",
//     },
//   },
// };

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SERCRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       maxAge: 3600000,
//     },
//     store: new MySQLStore(sessionStoreOption),
//   })
// );

// //express-session 보다 아래 있어야함
// app.use(passport.initialize());
// //passport deserializeUser 실행
// app.use(passport.session());

//test router
//const usersRouter = require("./routes/users");
const commonRouter = require("./routes/common");
const fileUploadRouter = require("./routes/test/uploadView");
const testRouter = require("./routes/test/test");
const geolocationViewRouter = require("./routes/test/geolocation_view");

//app.use("/users", usersRouter);
app.use("/common", commonRouter);
app.use("/uploadView", fileUploadRouter);
app.use("/test", testRouter);
app.use("/geolocationView", geolocationViewRouter);

//dev router
const geolocationRouter = require("./routes/geolocation");

app.use("/geolocation", geolocationRouter);

//잘못된 경로 접근시 error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

//server error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("internal server error");
});

module.exports = app;
