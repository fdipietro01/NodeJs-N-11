const MongoStore = require("connect-mongo");
const MongoSingleton = require("../daos/mongoDaos/MongoSingleton");
const program = require("../../process");

const { mode } = program.opts();
require("dotenv").config({
  path: mode === "DEVELOPMENT" ? "./.env.development" : "./.env.production",
});
const mongoUrl = process.env.MONGO_URL;

const config = {
  persistence: process.env.PERSISTENCE,
  dbConection: () => MongoSingleton.connect(mongoUrl),
  session: {
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 130000000,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false,
  },
};

module.exports = config;
