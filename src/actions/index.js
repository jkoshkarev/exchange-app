export const setSrcAmount = amount => ({
  type: 'SET_SRC_AMOUNT',
  amount
});

export const setTargetAmount = amount => ({
  type: 'SET_TARGET_AMOUNT',
  amount
});

export const setSrcCurrency = currency => ({
  type: 'SET_SRC_CURRENCY',
  currency
});

export const setTargetCurrency = currency => ({
  type: 'SET_TARGET_CURRENCY',
  currency
});

export const exchange = ({
  srcAmount,
  srcCurrency,
  targetAmount,
  targetCurrency
} = {}) => ({
  type: 'EXCHANGE',
  payload: {
    srcAmount,
    srcCurrency,
    targetAmount,
    targetCurrency
  }
});

export const pollingRates = () => ({
  type: 'POLLING_EXCHANGE_RATES'
});

export const ratesLoaded = rates => ({
  type: 'RATES_LOADED',
  rates
});

export const ratesLoadFailed = error => ({
  type: 'RATES_LOAD_FAILED',
  error
});
