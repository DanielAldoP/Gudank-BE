require("dotenv").config()

const cors = require('cors')

const express = require('express');
const app = express();
const router = require('./routers/index')
const port = process.env.PORT || 3000;

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
  res.send('Gudank BE!');
});

app.get('/healthcheck', (req, res) => {
  res.send(true);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app