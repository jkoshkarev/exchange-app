const RATES_API_URL = process.env.REACT_APP_RATES_API_URL;
export const RATES_API_CURRENCIES = process.env.REACT_APP_RATES_API_CURRENCIES;

export function fetchRates(currencies) {
  const url = new URL(RATES_API_URL);
  if (currencies) {
    url.searchParams.append('symbols', currencies);
  }

  return fetch(url);
}
