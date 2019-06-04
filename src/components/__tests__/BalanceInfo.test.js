import BalanceInfo from '../BalanceInfo';
import Info from '../Info';
import { formatMoney } from '../../utils/currencyUtils';

describe('BalanceInfo', () => {
  it('should render Info with custom className', () => {
    const className = 'class';
    const wrapper = shallow(<BalanceInfo className={className} />);
    expect(wrapper.find(Info)).toHaveClassName(className);
  });

  it('should pass highlight as false to Info if undefined', () => {
    const wrapper = shallow(<BalanceInfo />);
    expect(wrapper.find(Info)).toHaveProp('highlight', false);
  });

  it('should pass highlight as true to Info if true', () => {
    const wrapper = shallow(<BalanceInfo highlight />);
    expect(wrapper.find(Info)).toHaveProp('highlight', true);
  });

  it('should render balance info', () => {
    const wallet = {
      amount: 1,
      currency: 'USD'
    };
    const wrapper = shallow(<BalanceInfo wallet={wallet} />);
    expect(wrapper.find(Info)).toHaveProp(
      'children',
      `Balance: ${formatMoney(wallet)}`
    );
  });
});
