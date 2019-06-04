export function reduceRates(rates = null, action) {
  switch (action.type) {
    case 'RATES_LOADED':
      return action.rates;
    default:
      return rates;
  }
}

export function reducePollingRates(pollingRates = false, action) {
  switch (action.type) {
    case 'RATES_LOADED':
    case 'RATES_LOAD_FAILED':
      return false;
    case 'POLLING_EXCHANGE_RATES':
      return true;
    default:
      return pollingRates;
  }
}

export function reducePollingError(pollingError = null, action) {
  switch (action.type) {
    case 'RATES_LOADED':
    case 'POLLING_EXCHANGE_RATES':
      return null;
    case 'RATES_LOAD_FAILED':
      return action.error;
    default:
      return pollingError;
  }
}
