const mongoose = require("mongoose");
const logger = require("../../logger/customLogger");

class MongoSingleton {
  static #instance;
  constructor(mongoUrl) {
    try {
      mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      logger.error(err, "Error al conectar a la db");
    }
  }
  static connect(mongoUrl) {
    if (this.#instance) {
      logger.info("Mongo already connected");
      return this.#instance;
    } else {
      this.#instance = new MongoSingleton(mongoUrl);
      logger.info("Mongo connect succesfull");
    }
  }
}

module.exports = MongoSingleton;
