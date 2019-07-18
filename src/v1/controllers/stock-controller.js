const api_service = require('../../api_service')

module.exports = {
  // Gets the price of all stocks.
  getTicker(req, res, next) {
    api_service.ticker()
      .then((response) => {
        res.status(200).send(response)
      })
      .catch((error) => {
        res.status(400).send({
          'error': error
        })
      })
  },

  // Gets the Name and Symbols of all stocks.
  getSymbols(req, res, next) {
    api_service.tickerDetails()
      .then((response) => {
        res.status(200).send(response)
      })
      .catch((error) => {
        res.status(400).send({
          'error': error
        })
      })
  },

  // Gets the price of a stock.
  getStockPrice(req, res, next) {
    api_service.stockPrice(req.params.symbol)
      .then((response) => {
        res.status(200).send(response)
      })
      .catch((error) => {
        let regex = RegExp('Invalid stock symbol name*')
        if (regex.test(error)) {
          error = 'Invalid stock symbol. Get list of stock symbols at /api/v1/stocks'
        }
        res.status(400).send({
          'error': error
        })
      })
  }

}