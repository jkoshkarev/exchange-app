import { call, put, delay } from 'redux-saga/effects';
import { pollingRates, ratesLoaded, ratesLoadFailed } from '../actions';
import { fetchRates, RATES_API_CURRENCIES } from './ratesApi';

const RATES_API_POLLING_DELAY_MS =
  process.env.REACT_APP_RATES_API_POLLING_DELAY_MS;

function* pollRates() {
  while (true) {
    yield put(pollingRates());
    try {
      const response = yield call(fetchRates, RATES_API_CURRENCIES);
      if (response.status >= 200 && response.status < 300) {
        const { rates } = yield response.json();
        yield put(ratesLoaded(rates));
      } else {
        yield put(ratesLoadFailed(response));
      }
    } catch (e) {
      put(ratesLoadFailed(e));
    }
    yield delay(RATES_API_POLLING_DELAY_MS);
  }
}

export default pollRates;
