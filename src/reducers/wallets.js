import _currency from 'currency.js';

export default function reduceWallets(wallets = [], action) {
  if (action.type !== 'EXCHANGE') {
    return wallets;
  }

  const {
    srcAmount,
    srcCurrency,
    targetAmount,
    targetCurrency
  } = action.payload;

  const updatedWallets = wallets.map(({ amount, currency }) => {
    if (currency === srcCurrency) {
      return {
        currency,
        amount: _currency(amount).subtract(srcAmount).value
      };
    }
    if (currency === targetCurrency) {
      return {
        currency,
        amount: _currency(amount).add(targetAmount).value
      };
    }
    return { amount, currency };
  });

  return updatedWallets;
}
