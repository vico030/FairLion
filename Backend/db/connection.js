const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

var serveradress = ""
if (process.env.DB_TYPE === "local") serveradress = "mongodb://" + process.env.HOST + ":" + process.env.PORT + "/" + process.env.DB_NAME;
else if (process.env.DB_TYPE === "remote") serveradress = "mongodb+srv://" + process.env.DB_LOGIN + "@cluster0.w6vde.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";

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
