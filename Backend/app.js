require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
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

// Error Handling
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})