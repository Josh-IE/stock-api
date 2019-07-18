const request = require('request')
const util = require('./utils')

const url = 'https://financialmodelingprep.com/api/v3'

module.exports = {
  /**
   * ticker() returns a request promise object that retrieves a list of stocks
   * and their respective realtime prices.
   * @return {Promise} GET request Promise object.
   */
  ticker() {
    return new Promise((resolve, reject) => {
      request(`${url}/stock/real-time-price`, {
        json: true
      }, (err, res, body) => {
        if (err) reject(err)
        resolve(body.stockList)
      });
    })
  },

  /**
   * tickerDetails() returns a request promise object that retrieves a list of stocks
   * and their respective symbols.
   * @return {Promise} GET request Promise object.
   */
  tickerDetails() {
    return new Promise((resolve, reject) => {
      request(`${url}/company/stock/list`, {
        json: true
      }, (err, res, body) => {
        if (err) reject(err)

        // the response comes with stock prices, which are not realtime,
        // thus they are deleted.
        let symbolsList = util.deletePriceKey(body.symbolsList)

        resolve(symbolsList)
      });
    })
  },

  /**
   * stockPrice() returns a request promise object that retrieves the realtime price
   * of a stock by its symbol.
   * @return {Promise} GET request Promise object.
   */
  stockPrice(symbol) {
    return new Promise((resolve, reject) => {
      request(`${url}/stock/real-time-price/${symbol}`, {
        json: true
      }, (err, res, body) => {
        if (err) reject(err)
        if (body.Error) reject(body.Error)
        resolve(body)
      });
    })
  }
}