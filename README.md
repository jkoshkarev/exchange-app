# [Currency Exchange app](http://ikoshkarev-exchange.s3-website.eu-west-2.amazonaws.com)

## Features

- 3 wallets: `USD`, `EUR` and `GDP` with predefined amounts
- choosing source and target wallets
- swapping wallets
- exchanging money between wallets
- updating FX rates every 10s
- validations: minimal amount to exchange and sufficient balance check

## Tech stack

- React 16.8
- Redux to manage the state
- [Redux-saga](https://github.com/redux-saga/redux-saga) to call FX rates API
- Jest/Enzyme for unit testing
- SASS as a CSS post processor
- CSS variables
- [currency.js](https://currency.js.org/) to deal with floating point numbers

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Configuration

The app exposes the following environment variables:

- `REACT_APP_RATES_API_URL` - [Open Exchange Rates API](https://docs.openexchangerates.org/docs/api-introduction) URL
- `REACT_APP_RATES_API_POLLING_DELAY_MS` - polling delay in milliseconds (default `10000`)
- `REACT_APP_RATES_API_CURRENCIES` - currencies to poll (e.g. `USD,EUR,GDP`)

In order to change an env variable run

```bash
set REACT_APP_RATES_API_URL="..." && npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Possible improvements

- add API error handling
- remember recently change amount (source or target) and then, when currencies are swapped, preserve this amount

## Additional inforamtion

Currency Exchange app is deployed under [Currency Exchange app](http://ikoshkarev-exchange.s3-website.eu-west-2.amazonaws.com)
