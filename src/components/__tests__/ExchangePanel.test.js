import ExchangePanel from '../ExchangePanel';
import ExchangeCard from '../ExchangeCard';
import RateIndicator from '../RateIndicator';
import SwapCurrenciesButton from '../SwapCurrenciesButton';
import Button from '../Button';

describe('ExchangeCard', () => {
  const props = {
    srcCurrency: 'USD',
    targetCurrency: 'EUR',
    srcAmount: 0,
    targetAmount: 0,
    onSrcAmountChange: () => {},
    onTargetAmountChange: () => {},
    wallets: [{ amount: 1, currency: 'USD' }, { amount: 1, currency: 'EUR' }],
    rates: {
      USD: 1,
      EUR: 0.8
    },
    onSrcCurrencyChange: () => {},
    onTargetCurrencyChange: () => {},
    handleExchange: () => {}
  };

  describe('renders default components', () => {
    const panel = shallow(<ExchangePanel {...props} />);

    it('should have container class', () => {
      expect(panel).toHaveClassName('container');
    });

    it('should render src ExchangeCard with correct props', () => {
      expect(panel.find(ExchangeCard).first()).toHaveProp({
        currency: props.srcCurrency,
        wallets: props.wallets,
        amount: props.srcAmount,
        onAmountChange: props.onSrcAmountChange,
        onCurrencyChange: props.onSrcCurrencyChange,
        showMinimumAmountInfo: false,
        showExceedsBalance: false,
        prefix: '- ',
        className: 'srcCard'
      });
    });

    it('should render target ExchangeCard with correct props', () => {
      expect(panel.find(ExchangeCard).last()).toHaveProp({
        currency: props.targetCurrency,
        wallets: props.wallets,
        amount: props.targetAmount,
        onAmountChange: props.onTargetAmountChange,
        onCurrencyChange: props.onTargetCurrencyChange,
        prefix: '+ '
      });
    });

    it('should render RateIndicator with correct props', () => {
      expect(panel.find(RateIndicator)).toHaveProp({
        srcCurrency: props.srcCurrency,
        targetCurrency: props.targetCurrency,
        rates: props.rates
      });
    });
  });

  it('should call onSrcCurrencyChange with target currency when SwapCurrenciesButton is clicked', () => {
    const onSrcCurrencyChange = jest.fn();
    const panel = shallow(
      <ExchangePanel {...props} onSrcCurrencyChange={onSrcCurrencyChange} />
    );
    panel.find(SwapCurrenciesButton).prop('onClick')();
    expect(onSrcCurrencyChange).toHaveBeenCalledWith(props.targetCurrency);
  });

  describe('Exchange Button', () => {
    it('should display disabled button when cannot exchange', () => {
      const panel = shallow(<ExchangePanel {...props} />);
      expect(panel.find(Button)).toHaveProp('disabled', true);
    });
  });

  it('should display enabled button when can exchange', () => {
    const panel = shallow(<ExchangePanel {...props} srcAmount={0.5} />);
    expect(panel.find(Button)).toHaveProp('disabled', false);
  });

  it('should call handleExchange when button is clicked', () => {
    const handleExchange = jest.fn();
    const panel = shallow(
      <ExchangePanel
        {...props}
        srcAmount={0.5}
        handleExchange={handleExchange}
      />
    );
    panel.find(Button).prop('onClick')();
    expect(handleExchange).toHaveBeenCalledWith({
      srcAmount: 0.5,
      srcCurrency: props.srcCurrency,
      targetCurrency: props.targetCurrency,
      targetAmount: 0
    });
  });
});
