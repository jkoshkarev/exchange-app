import ExchangeCard from '../ExchangeCard';
import CurrencySelect from '../CurrencySelect';
import FormattedInput from '../FormattedInput';
import BalanceInfo from '../BalanceInfo';
import Info from '../Info';

describe('ExchangeCard', () => {
  const currency = 'USD';
  const wallets = [
    { amount: 1, currency: 'USD' },
    { amount: 1, currency: 'EUR' }
  ];

  describe('renders default components', () => {
    const onCurrencyChange = () => {};
    const onAmountChange = () => {};
    const prefix = '- ';
    const amount = 1;
    const card = shallow(
      <ExchangeCard
        currency={currency}
        wallets={wallets}
        onCurrencyChange={onCurrencyChange}
        onAmountChange={onAmountChange}
        prefix={prefix}
        amount={amount}
      />
    );

    it('should render CurrencySelect with correct props', () => {
      expect(card.find(CurrencySelect)).toHaveProp({
        currency,
        wallets,
        onChange: onCurrencyChange
      });
    });

    it('should render FormattedInput with correct props', () => {
      expect(card.find(FormattedInput)).toHaveProp({
        value: amount,
        onChange: onAmountChange,
        prefix,
        className: 'input'
      });
    });

    it('should render BalanceInfo with correct props', () => {
      expect(card.find(BalanceInfo)).toHaveProp({
        wallet: wallets.find(w => w.currency === currency),
        highlight: false,
        className: 'balance'
      });
    });
  });

  it('should render exceeds balance info if `showExceedsBalance` = true', () => {
    const card = shallow(
      <ExchangeCard
        amount={null}
        currency={currency}
        wallets={wallets}
        showExceedsBalance
      />
    );
    expect(card.find(Info)).toHaveProp({
      className: 'info',
      children: 'exceeds balance'
    });
  });

  it('should render minimum amount info if `showMinimumAmountInfo` = true', () => {
    const card = shallow(
      <ExchangeCard
        amount={null}
        currency={currency}
        wallets={wallets}
        showMinimumAmountInfo
      />
    );
    expect(card.find(Info)).toHaveProp({
      className: 'info',
      highlight: true,
      children: 'Minimum amount is $0.10'
    });
  });

  it('should add exceedsInput class to Input when `showExceedsBalance` = true', () => {
    const card = shallow(
      <ExchangeCard
        amount={null}
        currency={currency}
        wallets={wallets}
        showExceedsBalance
      />
    );
    expect(card.find(FormattedInput)).toHaveClassName('exceedsInput');
  });
});
