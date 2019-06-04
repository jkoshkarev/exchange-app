import reduceWallets from '../wallets';
import { exchange } from '../../actions';

describe.only('wallets reducer', () => {
  it('handles default state', () => {
    expect(reduceWallets([], {})).toEqual([]);
  });

  it('handles EXCHANGE when sufficient balance', () => {
    const wallets = [
      { amount: 1, currency: 'USD' },
      { amount: 0, currency: 'EUR' }
    ];
    const srcAmount = 0.5;
    const srcCurrency = 'USD';
    const targetAmount = 0.4;
    const targetCurrency = 'EUR';
    const updatedWallets = reduceWallets(
      wallets,
      exchange({ srcAmount, srcCurrency, targetAmount, targetCurrency })
    );

    expect(updatedWallets).toHaveLength(2);
    expect(updatedWallets[0]).toEqual({ currency: 'USD', amount: 0.5 });
    expect(updatedWallets[1]).toEqual({ currency: 'EUR', amount: 0.4 });
  });
});
