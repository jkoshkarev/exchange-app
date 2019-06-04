import { convert } from '../utils/currencyUtils';

export const DEFAULT_AMOUNT = null;

export function reduceSrcAmount(
  srcAmount = DEFAULT_AMOUNT,
  action,
  { srcCurrency, targetCurrency, rates } = {}
) {
  switch (action.type) {
    case 'SET_SRC_AMOUNT':
      return action.amount;
    case 'SET_TARGET_AMOUNT':
      return convert(action.amount, targetCurrency, srcCurrency, rates);
    case 'EXCHANGE':
      return DEFAULT_AMOUNT;
    default:
      return srcAmount;
  }
}

/**
 * @param {number} targetAmount
 * @param {object} action
 * @param {object} dependency
 * @param {number} dependency.srcAmount
 * @param {string} dependency.srcCurrency
 * @param {string} dependency.targetCurrency
 * @param {Object.<string, number>} dependency.rates
 * @returns {number}
 */
export function reduceTargetAmount(
  targetAmount = DEFAULT_AMOUNT,
  action,
  { srcAmount, srcCurrency, targetCurrency, rates } = {}
) {
  switch (action.type) {
    case 'SET_TARGET_AMOUNT':
      return action.amount;
    case 'SET_SRC_AMOUNT':
      return convert(action.amount, srcCurrency, targetCurrency, rates);
    case 'SET_SRC_CURRENCY':
    case 'SET_TARGET_CURRENCY':
    case 'RATES_LOADED':
      return convert(srcAmount, srcCurrency, targetCurrency, rates);
    case 'EXCHANGE':
      return DEFAULT_AMOUNT;
    default:
      return targetAmount;
  }
}
