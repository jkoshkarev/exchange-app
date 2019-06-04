import { NumberFormatCustom } from '../FormattedInput';
import { THOUSAND_SEPARATOR, PRECISION } from '../../utils/currencyUtils';

describe('NumberFormatCustom', () => {
  it('should should pass inputRef', () => {
    const inputRef = () => {};
    expect(shallow(<NumberFormatCustom inputRef={inputRef} />)).toHaveProp(
      'getInputRef',
      inputRef
    );
  });

  it('should should pass empty sting to value if value is null', () => {
    expect(shallow(<NumberFormatCustom value={null} />)).toHaveProp(
      'value',
      ''
    );
  });

  it('should should pass number to value if specified', () => {
    const value = 1;
    expect(shallow(<NumberFormatCustom value={value} />)).toHaveProp(
      'value',
      value
    );
  });

  it('should should correct default props', () => {
    expect(shallow(<NumberFormatCustom />)).toHaveProp({
      decimalScale: PRECISION,
      thousandSeparator: THOUSAND_SEPARATOR,
      placeholder: '0',
      allowNegative: false
    });
  });

  describe('onChange', () => {
    it('should call onChange if value and floatValue are different', () => {
      const onChange = jest.fn();
      const onValueChange = shallow(
        <NumberFormatCustom onChange={onChange} value={1} />
      ).prop('onValueChange');
      onValueChange({ floatValue: 2 });
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('should not call onChange if value and floatValue are same', () => {
      const onChange = jest.fn();
      const onValueChange = shallow(
        <NumberFormatCustom onChange={onChange} value={1} />
      ).prop('onValueChange');
      onValueChange({ floatValue: 1 });
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should not call onChange if value and floatValue are opposite', () => {
      const onChange = jest.fn();
      const onValueChange = shallow(
        <NumberFormatCustom onChange={onChange} value={1} />
      ).prop('onValueChange');
      onValueChange({ floatValue: -1 });
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should not call onChange if value is null and floatValue is undefined', () => {
      const onChange = jest.fn();
      const onValueChange = shallow(
        <NumberFormatCustom onChange={onChange} value={null} />
      ).prop('onValueChange');
      onValueChange({ floatValue: undefined });
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should call onChange with positive numbers even if floatValue is negative', () => {
      const onChange = jest.fn();
      const onValueChange = shallow(
        <NumberFormatCustom onChange={onChange} value={1} />
      ).prop('onValueChange');
      onValueChange({ floatValue: -2 });
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });
});
