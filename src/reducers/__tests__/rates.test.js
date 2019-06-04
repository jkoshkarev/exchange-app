import { reduceRates } from '../rates';
import { ratesLoaded } from '../../actions';

describe.only('rates reducer', () => {
  const rates = {
    USD: 1,
    EUR: 0.8
  };

  it('should handle default state', () => {
    expect(reduceRates(null, {})).toEqual(null);
  });

  it('should handle RATES_LOADED', () => {
    expect(reduceRates(null, ratesLoaded(rates))).toEqual(rates);
  });
});
