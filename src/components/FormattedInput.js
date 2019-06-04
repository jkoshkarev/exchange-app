import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { commonInputStyles } from './CurrencySelect';
import { THOUSAND_SEPARATOR, PRECISION } from '../utils/currencyUtils';

const StyledInput = withStyles(() => ({
  input: { ...commonInputStyles, textAlign: 'right' }
}))(InputBase);

/**
 * Displays number input with prefix, given precision and separator
 * (e.g. `- 123 456.78` or `+ 123 456.78`)
 */
const FormattedInput = ({ value, onChange, inputRef, prefix, className }) => (
  <StyledInput
    inputRef={inputRef}
    prefix={prefix}
    className={className}
    inputComponent={NumberFormatCustom}
    inputProps={{
      prefix,
      onChange,
      value
    }}
  />
);

FormattedInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  inputRef: PropTypes.object,
  className: PropTypes.string
};

export function NumberFormatCustom({ inputRef, onChange, value, ...other }) {
  const handelChange = useCallback(
    ({ floatValue }) => {
      if (valueNotChanged(value, floatValue)) {
        return;
      }
      onChange(
        isInputEmpty(floatValue) ? null : normalizeFloatValue(floatValue)
      );
    },
    [value, onChange]
  );

  return (
    <NumberFormat
      {...other}
      value={value === null ? '' : value}
      getInputRef={inputRef}
      onValueChange={handelChange}
      decimalScale={PRECISION}
      allowNegative={false}
      thousandSeparator={THOUSAND_SEPARATOR}
      placeholder="0"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.number
};

/**
 * Function to prevent redundant onChange callback invocations
 * @param {number|null} value - value passed from parrent
 * @param {number} floatValue - value passed from NumberFormat (might be negative)
 * @returns {boolean}
 */
function valueNotChanged(value, floatValue) {
  return (
    value === floatValue ||
    value === -floatValue ||
    (value === null && isInputEmpty(floatValue))
  );
}

function isInputEmpty(floatValue) {
  return floatValue === undefined;
}

/**
 * Since floatValue can be negative (because of `- ` prefix), we need
 * to pass a positive value.
 * @param {number} floatValue
 * @returns {number}
 */
function normalizeFloatValue(floatValue) {
  return Math.abs(floatValue);
}

export default FormattedInput;
