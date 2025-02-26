var createError = require("http-errors");
var express = require("express");
//const bodyParser = require("express.json"); // Assure-toi d'utiliser body-parser
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session"); //session
const cors = require("cors");
const { connectToMongoDb } = require("./config/db");
//const { requireAuthUser } = require("./middlewares/authMiddlewares");
const logMiddleware = require('./middlewares/logsMiddlewares'); //log


// gemini

// gemini
const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;
 

require("dotenv").config();


const http = require("http"); //1

var indexRouter = require("./routes/indexRouter");
var usersRouter = require("./routes/usersRouter");
var osRouter = require("./routes/osRouter");
var maisonRouter = require("./routes/maisonRouter");
var GeminiRouter = require("./routes/GeminiRouter");
var espaceRouter = require("./routes/espaceRouter");
var appareilRouter = require("./routes/appareilRouter");
var capteurRoute = require("./routes/capteurRoute");

var app = express();
//app.use(bodyParser()); // Active le parsing du JSON

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logMiddleware)  //log

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/os", osRouter);
app.use("/maisons", maisonRouter); // Route pour les maisons
app.use("/gemini", GeminiRouter);
app.use("/espaces", espaceRouter);
app.use("/appareils", appareilRouter);
app.use("/capteurs", capteurRoute);

app.use(session({
  secret: process.env.Net_Secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
app.use(express.static("public"));

app.use(cors({
  origin: process.env.Origin_Front,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials',
  credentials: true
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

const server = http.createServer(app); //2
server.listen(process.env.port, () => {
  connectToMongoDb()
  console.log("app is running on port 5000");
});