const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const serveradress = "mongodb://" + process.env.HOST + ":" + process.env.PORT + "/" + process.env.DB_NAME;

const database = mongoose.connect(
    serveradress,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        retryWrites: true,
        w: "majority",
    },
    () => console.log("Verbindung mit Datenbank wurde hergestellt.")
);

module.exports = database;
