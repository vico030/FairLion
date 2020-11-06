const express = require('express')
const app = express()
const port = 3000

var allRoutes = require('./routes/allRoutes');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Routes
app.use('/', allRoutes.indexRoute);
app.use('/users', allRoutes.usersRoute);
app.use('/articles', allRoutes.articlesRoute);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

