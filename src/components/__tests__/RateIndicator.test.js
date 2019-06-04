import RateIndicator from '../RateIndicator';

describe('RateIndicator', () => {
  const fakeRates = {
    USD: 1,
    EUR: 0.8884
  };

  const srcCurrency = 'USD';
  const targetCurrency = 'EUR';

  it('should render label showing correct rate', () => {
    const wrapper = shallow(
      <RateIndicator
        srcCurrency={srcCurrency}
        targetCurrency={targetCurrency}
        rates={fakeRates}
      />
    );
    expect(wrapper.children()).toHaveProp('label', '$1 = €0.8884');
  });

  it('should render label showing correct rate with custom precision', () => {
    const wrapper = shallow(
      <RateIndicator
        srcCurrency={srcCurrency}
        targetCurrency={targetCurrency}
        rates={fakeRates}
        precision={2}
      />
    );
    expect(wrapper.children()).toHaveProp('label', '$1 = €0.89');
  });
});
