const bodyParser = require('body-parser')
const express = require('express')
const routes = require('./src/v1/routes/routes.js')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/$', (req, res) => {
  res.json({
    "/": "returns this page",
    "/api/v1": "returns a list of all stocks with their symbols and prices",
    "/api/v1/ticker/details": "returns a list of all stocks with their names and symbols",
    "/api/v1/ticker/:symbol": "returns the price and symbol of a stock"
  })
})
app.use('/api/v1', routes)
app.use((req, res) => {
  res.status(404).end()
})

module.exports = app;