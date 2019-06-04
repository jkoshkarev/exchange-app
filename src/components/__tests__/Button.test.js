import Button from '../Button';

describe('Button', () => {
  it('should render with disabled, disableRipple and variant=`extended` props by default', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toHaveProp({
      disabled: false,
      disableRipple: true,
      variant: 'extended'
    });
  });

  it('should pass onClick prop', () => {
    const onClick = () => {};
    const wrapper = shallow(<Button onClick={onClick} />);
    expect(wrapper).toHaveProp('onClick', onClick);
  });

  it('should pass disabled prop as true when set to true', () => {
    const wrapper = shallow(<Button disabled />);
    expect(wrapper).toHaveProp('disabled', true);
  });

  it('should pass children prop if given', () => {
    const text = 'text';
    const wrapper = shallow(<Button>{text}</Button>);
    expect(wrapper).toHaveProp('children', text);
  });
});
