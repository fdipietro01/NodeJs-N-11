const mongoose = require("mongoose");

class MongoSingleton {
  static #instance;
  constructor(mongoUrl) {
    try {
      mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err, "Error al conectar a la db");
    }
  }
  static connect(mongoUrl) {
    if (this.#instance) {
      console.log("Mongo already connected");
      return this.#instance;
    } else {
      this.#instance = new MongoSingleton(mongoUrl);
      console.log("Mongo connect succesfull");
    }
  }
}

module.exports = MongoSingleton;
