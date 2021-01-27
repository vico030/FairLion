require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.API_PORT
const bodyparser = require("body-parser");
const { handleError } = require('./helpers/error')
const cookieParser = require('cookie-parser');
const cors = require("cors")

var allRoutes = require('./routes/allRoutes');
const database = require("./db/connection");

app.use(cors())
app.use(cookieParser());
app.use(bodyparser.json());

// Routes
app.use('/files', express.static('files'));

app.use('/', allRoutes.indexRoute);
app.use("/favourites", allRoutes.favoritesRoute);
app.use('/users', allRoutes.usersRoute);
app.use('/articles', allRoutes.articlesRoute);
app.use('/auth', allRoutes.authRoute);
app.use("/articleRequest", allRoutes.articleRequestRoute);

app.get("/.well-known/pki-validation/3675EFC7AF7E0937FB04977F9F7A6B17.txt", (req, res) => {
  var text = '2D52FF6750C24F5947AE9865793614ADBFED6217E6E99B7810DD7E425B294A8A\ncomodoca.com\n7ddf900cdbdb34c'
  res.attachment('3675EFC7AF7E0937FB04977F9F7A6B17.txt')
  res.type('txt')
  res.send(text)
});

// Error Handling
app.use((err, req, res, next) => {
  handleError(err, res);
});

var fs = require('fs');
var https = require('https');

var privateKey  = fs.readFileSync('./certs/fairLion.key', 'utf8');
var certificate = fs.readFileSync('./certs/fairLion.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate, passphrase:process.env.EMAIL_PASSWORD};

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log(`Example app listening at https://localhost:443`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})