const router = require("./routes/index");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./middlewares/passportMiddleware");
const cors = require("cors");
const { Server } = require("socket.io");
const { addLogger } = require("./middlewares/logger");
const logger = require("./logger/customLogger");

const app = express();
app.use(addLogger);

//enable cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//setear cookies
app.use(cookieParser());

app.use("/aleas", express.static(__dirname + "/public"));

//parse Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting passport
app.use(passport.initialize());
initializePassport();

//setting router
app.use("/", router);

const httpServer = app.listen(process.env.PORT, () => {
  logger.info(
    `Servidor corriendo en puerto ${
      process.env.PORT
    } - ${new Date().toLocaleTimeString()}`
  );
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.set("socketio", io);
