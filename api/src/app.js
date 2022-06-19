const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');

const fileUpload = require("express-fileupload");
const multer = require('multer');
const uuid = require('uuidv4');
const path = require('path');
require('dotenv').config();


//Connection on database
const {DB_USER,DB_HOST,DB_NAME,DB_PORT} = process.env
const URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const autoIncrement = require('mongoose-auto-increment');

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((err) => console.log(err));

const db = mongoose.connection;
autoIncrement.initialize(mongoose)

//Server
const server = express();

// settings
// server.set('views', path.join(__dirname, 'views'));
server.set("port", process.env.PORT || 3001);
server.name = "API";

// server.use(bodyParser.urlencoded({ extended: false }))
// server.use(bodyParser.json())
 
// // Set EJS as templating engine
// server.set("view engine", "ejs");

server.use(express.json({ limit: "500mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use(express.urlencoded({extended: false}));

server.use(
  fileUpload({
    tempFileDir: "/temp", // put temp directory path here
  })
);


// cors
server.use(cors());


//Routes
const routes = require("./routes");
server.use("/", routes);

server.use(express.static(path.join(__dirname, "public")));

server.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// Catch 404 Errors
const err = new Error("not Found");
server.use((req, res, next) => {
  err.status = 404;
  next(err);
});

// Error hanlder function
server.use((err, req, res, next) => {
  const error = server.get("env") === "development" ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = server;
