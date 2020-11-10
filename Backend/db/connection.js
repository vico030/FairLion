const env = require("env");

const mongoose = require("mongoose");
const config = require("config");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const serveradress = "mongodb://" + env.HOST + ":" + env.PORT + "/" + env.DB_NAME;

const database = mongoose.connect(
    serveradress,
    () => console.log("Verbindung mit Datenbank wurde hergestellt.")
);

module.exports = database;
