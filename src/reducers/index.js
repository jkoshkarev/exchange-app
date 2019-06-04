import { reduceRates, reducePollingRates, reducePollingError } from './rates';
import reduceWallets from './wallets';
import { reduceSrcAmount, reduceTargetAmount, DEFAULT_AMOUNT } from './amount';
import { reduceSrcCurrency, reduceTargetCurrency } from './currency';

const initialState = {
  rates: null,
  srcCurrency: null,
  targetCurrency: null,
  wallets: [],
  srcAmount: DEFAULT_AMOUNT,
  targetAmount: DEFAULT_AMOUNT,
  pollingRates: false,
  pollingError: null
};

export default function root(state = initialState, action) {
  const rates = reduceRates(state.rates, action);
  const pollingRates = reducePollingRates(state.pollingRates, action);
  const pollingError = reducePollingError(state.pollingError, action);
  const wallets = reduceWallets(state.wallets, action);
  const srcCurrency = reduceSrcCurrency(
    state.srcCurrency,
    action,
    state.targetCurrency
  );
  const targetCurrency = reduceTargetCurrency(
    state.targetCurrency,
    action,
    state.srcCurrency
  );
  const srcAmount = reduceSrcAmount(state.srcAmount, action, {
    srcCurrency,
    targetCurrency,
    rates
  });
  const targetAmount = reduceTargetAmount(state.targetAmount, action, {
    srcAmount,
    srcCurrency,
    targetCurrency,
    rates
  });

  return {
    rates,
    pollingRates,
    pollingError,
    wallets,
    srcCurrency,
    targetCurrency,
    srcAmount,
    targetAmount
  };
}
