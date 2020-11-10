const mongoose = require("mongoose");
const config = require("config");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const serveradress = "mongodb://" + config.get("dbConfig.host") + ":" + config.get("dbConfig.port") + "/" + config.get("dbConfig.dbName");

const database = mongoose.connect(
    serveradress,
    () => console.log("Verbindung mit Datenbank wurde hergestellt.")
);

module.exports = database;
