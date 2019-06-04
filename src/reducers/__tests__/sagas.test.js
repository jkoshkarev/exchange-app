import { call, put } from 'redux-saga/effects';
import pollRates from '../sagas';
import { fetchRates, RATES_API_CURRENCIES } from '../ratesApi';
import { pollingRates, ratesLoadFailed, ratesLoaded } from '../../actions';

describe('pollRates saga', () => {
  it('should dispatch RATES_LOADED if response is successfully', () => {
    const rates = {
      USD: 1,
      EUR: 0.8
    };
    const mockResponse = {
      status: 200,
      json() {
        return Promise.resolve({ rates });
      }
    };

    const gen = pollRates();
    expect(gen.next().value).toEqual(put(pollingRates()));
    expect(gen.next().value).toEqual(call(fetchRates, RATES_API_CURRENCIES));
    gen.next(mockResponse);

    expect(gen.next({ rates }).value).toEqual(put(ratesLoaded(rates)));
  });

  it('should dispatch RATES_LOAD_FAILED if response failed', () => {
    const mockResponse = {
      status: 500
    };

    const gen = pollRates();
    expect(gen.next().value).toEqual(put(pollingRates()));
    expect(gen.next().value).toEqual(call(fetchRates, RATES_API_CURRENCIES));
    expect(gen.next(mockResponse).value).toEqual(
      put(ratesLoadFailed(mockResponse))
    );
  });
});
