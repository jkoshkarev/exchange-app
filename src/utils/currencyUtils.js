import currency from 'currency.js';

export const formatMoney = (money, options = {}, locale = 'en-us') =>
  money
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: money.currency,
        ...options
      }).format(money.amount)
    : '';

export const THOUSAND_SEPARATOR = ' ';

export const PRECISION = 2;

export const convert = (
  value,
  fromCurrency,
  toCurrency,
  rates,
  precision = PRECISION
) => {
  if (!value || !rates) {
    return value;
  }
  const fromCurrencyRate = rates[fromCurrency];
  const toCurrencyRate = rates[toCurrency];
  if (!fromCurrencyRate || !toCurrencyRate) {
    console.warn(`Conversion ${fromCurrency} -> ${toCurrency} not found`);
    return value;
  }
  return currency(value, {
    precision
  })
    .multiply(toCurrencyRate)
    .divide(fromCurrencyRate).value;
};

export const numberFromString = value => currency(value).value;
