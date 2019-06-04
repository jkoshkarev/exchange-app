import { reduceSrcAmount, reduceTargetAmount, DEFAULT_AMOUNT } from '../amount';
import {
  setSrcAmount,
  setTargetAmount,
  exchange,
  setSrcCurrency,
  setTargetCurrency,
  ratesLoaded
} from '../../actions';

describe.only('amount reducer', () => {
  const rates = {
    USD: 1,
    EUR: 0.5
  };

  const srcCurrency = 'USD';
  const targetCurrency = 'EUR';

  describe('src amount reducer', () => {
    it('should return default amount', () => {
      expect(reduceSrcAmount(1, {})).toEqual(1);
    });

    it('should handle SET_SRC_AMOUNT', () => {
      expect(reduceSrcAmount(DEFAULT_AMOUNT, setSrcAmount(1))).toEqual(1);
    });

    it('should handle SET_TARGET_AMOUNT', () => {
      expect(
        reduceSrcAmount(DEFAULT_AMOUNT, setTargetAmount(1), {
          srcCurrency,
          targetCurrency,
          rates
        })
      ).toEqual(2);
    });

    it('should handle EXCHANGE', () => {
      expect(reduceSrcAmount(DEFAULT_AMOUNT, exchange())).toEqual(
        DEFAULT_AMOUNT
      );
    });
  });

  describe('target amount reducer', () => {
    const dependency = {
      srcAmount: 1,
      srcCurrency,
      targetCurrency,
      rates
    };

    it('should handle default amount', () => {
      expect(reduceTargetAmount(1, {})).toEqual(1);
    });

    it('should handle SET_TARGET_AMOUNT', () => {
      expect(reduceTargetAmount(DEFAULT_AMOUNT, setTargetAmount(1))).toEqual(1);
    });

    it('should handle SET_SRC_AMOUNT', () => {
      expect(
        reduceTargetAmount(DEFAULT_AMOUNT, setSrcAmount(1), dependency)
      ).toEqual(0.5);
    });

    it('should handle SET_SRC_CURRENCY', () => {
      expect(
        reduceTargetAmount(DEFAULT_AMOUNT, setSrcCurrency(), dependency)
      ).toEqual(0.5);
    });

    it('should handle SET_TARGET_CURRENCY', () => {
      expect(
        reduceTargetAmount(DEFAULT_AMOUNT, setTargetCurrency(), dependency)
      ).toEqual(0.5);
    });

    it('should handle EXCHANGE', () => {
      expect(
        reduceTargetAmount(DEFAULT_AMOUNT, exchange(), dependency)
      ).toEqual(DEFAULT_AMOUNT);
    });

    it('should handle RATES_LOADED', () => {
      expect(
        reduceTargetAmount(DEFAULT_AMOUNT, ratesLoaded(), dependency)
      ).toEqual(0.5);
    });
  });
});
