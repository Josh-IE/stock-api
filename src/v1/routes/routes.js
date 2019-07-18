const express = require('express')
const router = express.Router()
const stockController = require('../controllers/stock-controller')

router.get('/', stockController.getTicker)

router.get('/ticker/details', stockController.getSymbols)

router.get('/ticker/:symbol', stockController.getStockPrice)

module.exports = router