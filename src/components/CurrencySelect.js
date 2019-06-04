import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import walletShape from '../utils/commonPropTypes';
import mapCurrencyToFlag from '../utils/flagUtils';
import styles from './CurrencySelect.module.scss';

export const commonInputStyles = {
  fontWeight: 500,
  fontSize: '1.2rem'
};

const StyledInput = withStyles(() => ({
  input: { ...commonInputStyles, paddingRight: 0 }
}))(InputBase);

const StyledSelect = withStyles(() => ({
  root: { maxWidth: '3.75rem' },
  icon: { color: 'rgba(0, 0, 0, 0.87)' }
}))(Select);

const PlaceholderItem = withStyles(() => ({
  root: {
    color: 'var(--inactive-color)',
    fontSize: 'var(--label-font-size)',
    fontWeight: 'var(--label-font-weight)'
  }
}))(MenuItem);

/**
 * Dropdown for selecting currency
 */
function CurrencySelect({ currency, wallets, onChange, onExited, className }) {
  const handleChange = useCallback(
    ({ target: { value } }) => onChange && onChange(value.currency),
    [onChange]
  );

  const walletsList = useMemo(() => wallets.map(renderMenuItem), [wallets]);

  return (
    <StyledSelect
      renderValue={renderValue}
      value={currency}
      onChange={handleChange}
      input={<StyledInput />}
      MenuProps={{
        onExited
      }}
      className={className}
    >
      <PlaceholderItem disabled>Choose currency:</PlaceholderItem>
      {walletsList}
    </StyledSelect>
  );
}

CurrencySelect.propTypes = {
  /**
   * Selected currency
   */
  currency: PropTypes.string.isRequired,
  wallets: PropTypes.arrayOf(walletShape.isRequired).isRequired,
  /**
   * Callback with parameter as a selected currency
   */
  onChange: PropTypes.func,
  /**
   * Callback which is triggered when Select is closed (e.g. when a user click on an option)
   */
  onExited: PropTypes.func,
  className: PropTypes.string
};

// eslint-disable-next-line react/prop-types
function renderMenuItem({ amount, currency }) {
  const Flag = mapCurrencyToFlag(currency);
  return (
    <MenuItem key={currency} value={{ amount, currency }} disableRipple>
      <Flag className={styles.flag} />
      <span className={styles.walletDisplay}>{`${currency} · ${amount}`}</span>
    </MenuItem>
  );
}

function renderValue(value) {
  return value;
}

export default React.memo(CurrencySelect);
