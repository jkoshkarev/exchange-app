import CurrencySelect from '../CurrencySelect';

describe('CurrencySelect', () => {
  const fakeWallets = [
    { amount: 1, currency: 'USD' },
    { amount: 1, currency: 'EUR' }
  ];
  const selectedCurrency = 'USD';

  describe('with wallets and currency specified', () => {
    const select = shallow(
      <CurrencySelect wallets={fakeWallets} currency={selectedCurrency} />
    );

    it('should display placeholder', () => {
      expect(select.childAt(0)).toHaveProp({
        disabled: true,
        children: 'Choose currency:'
      });
    });

    it('should display first wallet as a second option', () => {
      expect(select.childAt(1).find('span')).toHaveProp({
        className: 'walletDisplay',
        children: 'USD · 1'
      });
    });

    it('should display second wallet as a third option', () => {
      expect(select.childAt(2).find('span')).toHaveProp({
        className: 'walletDisplay',
        children: 'EUR · 1'
      });
    });
  });

  describe('with callbacks specified', () => {
    it('should pass onChange callback which maps to selected currency', () => {
      const onChange = jest.fn();
      const select = shallow(
        <CurrencySelect
          wallets={fakeWallets}
          currency={selectedCurrency}
          onChange={onChange}
        />
      );
      select.prop('onChange')({
        target: {
          value: {
            currency: 'USD'
          }
        }
      });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('USD');
    });

    it('should pass onExited callback', () => {
      const onExited = () => {};
      const select = shallow(
        <CurrencySelect
          wallets={fakeWallets}
          currency={selectedCurrency}
          onExited={onExited}
        />
      );
      expect(select.prop('MenuProps').onExited).toBe(onExited);
    });
  });
});
