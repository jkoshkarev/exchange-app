import { reduceSrcCurrency, reduceTargetCurrency } from '../currency';
import { setSrcCurrency, setTargetCurrency } from '../../actions';

describe.only('currency reducer', () => {
  const srcCurrency = 'USD';
  const targetCurrency = 'EUR';

  describe('reduce src currency', () => {
    it('should handle default state', () => {
      expect(reduceSrcCurrency(undefined, {})).toEqual(null);
    });

    it('should handle SET_SRC_CURRENCY', () => {
      expect(
        reduceSrcCurrency(srcCurrency, setSrcCurrency(targetCurrency))
      ).toEqual(targetCurrency);
    });

    it('should handle SET_TARGET_CURRENCY if target currency is same', () => {
      expect(
        reduceSrcCurrency(
          srcCurrency,
          setTargetCurrency(srcCurrency),
          targetCurrency
        )
      ).toEqual(targetCurrency);
    });

    it('should handle SET_TARGET_CURRENCY if target currency is different', () => {
      expect(
        reduceSrcCurrency(srcCurrency, setTargetCurrency(targetCurrency), 'GBP')
      ).toEqual(srcCurrency);
    });
  });

  describe('reduce target currency', () => {
    it('should handle default state', () => {
      expect(reduceTargetCurrency(undefined, {})).toEqual(null);
    });

    it('should handle SET_TARGET_CURRENCY', () => {
      expect(reduceTargetCurrency('USD', setTargetCurrency('EUR'))).toEqual(
        'EUR'
      );
    });

    it('should handle SET_SRC_CURRENCY when src currency is same', () => {
      expect(reduceTargetCurrency('USD', setSrcCurrency('USD'), 'EUR')).toEqual(
        'EUR'
      );
    });

    it('should handle SET_SRC_CURRENCY when src currency is different', () => {
      expect(reduceTargetCurrency('EUR', setSrcCurrency('USD'), 'GBP')).toEqual(
        'EUR'
      );
    });
  });
});
