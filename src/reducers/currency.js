export function reduceSrcCurrency(
  srcCurrency = null,
  action,
  targetCurrencyFromState
) {
  switch (action.type) {
    case 'SET_SRC_CURRENCY': {
      return action.currency;
    }
    case 'SET_TARGET_CURRENCY': {
      if (srcCurrency === action.currency) {
        return targetCurrencyFromState;
      }
      return srcCurrency;
    }
    default:
      return srcCurrency;
  }
}

export function reduceTargetCurrency(
  targetCurrency = null,
  action,
  srcCurrencyFromState
) {
  switch (action.type) {
    case 'SET_TARGET_CURRENCY': {
      return action.currency;
    }
    case 'SET_SRC_CURRENCY': {
      if (targetCurrency === action.currency) {
        return srcCurrencyFromState;
      }
      return targetCurrency;
    }
    default:
      return targetCurrency;
  }
}
