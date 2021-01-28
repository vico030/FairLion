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

app.get("/.well-known/pki-validation/F72E950EE01A5C306B6B90AF3BB71E16.txt", (req, res) => {
  var text = '953BBDECA5A01578BC3CAC988670E3ED30FE76FF5729AC110EB550DE8A8B1608\ncomodoca.com\n7a82026923f2108'
  res.attachment('F72E950EE01A5C306B6B90AF3BB71E16.txt')
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