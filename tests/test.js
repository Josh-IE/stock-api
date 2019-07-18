const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const util = require('../src/utils')

const assert = chai.assert

//==================== Stock API test ====================

chai.use(chaiHttp)
describe('API Tests', function () {
  /**
   * Testing endpoint that gets the prices of all stocks.
   */
  describe('GET /api/v1/', function () {
    this.timeout(20000)
    it('respond with json containing a list of all stock objects with symbol and price property', function (done) {
      chai.request(server)
        .get('/api/v1')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.isAbove(res.body.length, 0)
          assert.hasAllKeys(res.body[0], ['symbol', 'price'])
          done()
        })
    })
  })

  /**
   * Testing endpoint that gets the names and symbols of all stocks.
   */
  describe('GET /api/v1/ticker/details', function () {
    this.timeout(30000)
    it('respond with json containing a list of all stock objects with name and symbol and property', function (done) {
      chai.request(server)
        .get('/api/v1/ticker/details')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.isAbove(res.body.length, 0)
          assert.hasAllKeys(res.body[0], ['name', 'symbol'])
          done()
        })
    })
  })

  /**
   * Testing endpoint that gets the price of a given stock.
   */
  describe('GET /api/v1/ticker/AAPL', function () {
    this.timeout(10000)
    it('respond with json containing the symbol and price of a stock', function (done) {
      chai.request(server)
        .get('/api/v1/ticker/MSFT')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.hasAllKeys(res.body, ['symbol', 'price'])
          done()
        })
    })
  })

  /**
   * Testing endpoint that gets the price of a given stock returns 400
   * if the stock symbol is invalid.
   */
  describe('GET /api/v1/ticker/ABCDEFG', function () {
    this.timeout(5000)
    it('respond with json with error key', function (done) {
      chai.request(server)
        .get('/api/v1/ticker/ABCDEFG')
        .end((err, res) => {
          assert.equal(res.status, 400)
          assert.hasAllKeys(res.body, ['error'])
          assert.equal(res.body.error, 'Invalid stock symbol. Get list of stock symbols at /api/v1/stocks')
          done()
        })
    })
  })

  /**
   * Testing endpoint that returns the api home page.
   */
  describe('GET /', function () {
    this.timeout(1000)
    it('respond api routes', function (done) {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.hasAllKeys(res.body, ['/', '/api/v1', '/api/v1/ticker/details', '/api/v1/ticker/:symbol'])
          done()
        })
    })
  })

  /**
   * Testing deletePriceKey() deletes the price property in all objects in an array.
   */
  describe('deletePriceKey()', function () {
    this.timeout(1000)
    let data = [{
      symbol: "BAC",
      name: "Bank of America Corporation",
      price: 29.27
    }, {
      symbol: "EEM",
      name: "iShares MSCI Emerging Index Fund",
      price: 42.81
    }, {
      symbol: "XLF",
      name: "SPDR Select Sector Fund - Financial",
      price: 27.87
    }, {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 203.41
    }]
    it('delete price key from array of objects', function () {
      util.deletePriceKey(data)
      assert.hasAllKeys(data[0], ['symbol', 'name'])
      assert.hasAllKeys(data[data.length - 1], ['symbol', 'name'])
    })
  })
})