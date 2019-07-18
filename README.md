# Stock Ticker App

## Introduction

The stock ticker app is an api that returns information on stocks in the exchange market. This information includes Trading Name, Ticker Symbol and Real time price. The api requires no authentication and its responses are json formatted.

## Stack

The app was built and tested against:

* Javascript Runtime: Node.js >= v8.10
* Framework: Express v4.17.1
* Test: Mocha v6.1.4, Chai v 4.2.0
* Deployment: Docker

## Development Approach

The app receives requests from the various endpoints and relays the request to a 3rd party securities api. The response from the 3rd party api is then parsed and returned as a json response to the original requesting client.
In cases where the 3rd party api returns an error, the response is caught and reformatted to replace the 3rd party's branded error message and response structure with a custom response.

The api app at exposes 3 endpoints.

### /

* GET: Returns the api home page.

  ```json
    {
      "/": "returns this page",
      "/api/v1": "returns a list of all stocks with their symbols and prices",
      "/api/v1/ticker/details": "returns a list of all stocks with their names and symbols",
      "/api/v1/ticker/:symbol": "returns the price and symbol of a stock"
    }
    ```

### /api/v1

* GET: Returns a list of stocks and their prices.

  ```json
  [
    {
        "symbol": "PALL",
        "price": 145.43
    },
    {
        "symbol": "CTVA#",
        "price": 27.14
    }
  ]
  ```

### /api/v1/ticker/details

* GET: Returns a list of stocks with their names and symbols.

  ```json
  [
    {
        "symbol": "SPY",
        "name": "SPDR S&P 500"
    },
    {
        "symbol": "CMCSA",
        "name": "Comcast Corporation Class A Common Stock"
    }
  ]
  ```

### /api/v1/ticker/:symbol

* GET: Returns the price of a stock

  ```json
  {
    "symbol": "SPY",
    "price": 297.31
  }
  ```

## Local Setup

* clone repository

  ```git clone https://github.com/Josh-IE/stock-api.git```
  
* change into app directory

  ```cd stock-api```

* install packages

  ```npm install```

* start server

  ```npm start```

### Test

  ```npm test```

## Deployment

### Prerequisites

* 2GB of free disk space

* Docker

* Internet connection

### Build Image

  ```docker build -t stock-api .```

### Run Container

  ```docker run -p 5200:8080 -d stock-api```

Api is now available at http://localhost:5200.

**Live Deployment**: http://13.58.227.117:5200
