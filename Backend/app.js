const express = require('express')
const app = express()
const port = 3000
const bodyparser = require("body-parser");

var allRoutes = require('./routes/allRoutes');
app.use(bodyparser.json());

const database = require("./db/connection");
// Routes
app.use('/', allRoutes.indexRoute);
app.use('/users', allRoutes.usersRoute);
app.use('/articles', allRoutes.articlesRoute);
app.use('/auth', allRoutes.authRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

