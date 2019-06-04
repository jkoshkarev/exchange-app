import Info from '../Info';

describe('Info', () => {
  it('should render with balanceDisplay class only by default', () => {
    const wrapper = shallow(<Info />);
    expect(wrapper).toHaveClassName('balanceDisplay');
    expect(wrapper).not.toHaveClassName('highlight');
  });

  it('should render with highlight class if highlight prop set to true', () => {
    const wrapper = shallow(<Info highlight />);
    expect(wrapper).toHaveClassName('balanceDisplay highlight');
  });

  it('should render children', () => {
    const text = 'text';
    const wrapper = shallow(<Info>{text}</Info>);
    expect(wrapper.find('span')).toHaveText(text);
  });
});
