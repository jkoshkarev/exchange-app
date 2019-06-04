import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BalanceInfo from './BalanceInfo';
import FormattedInput from './FormattedInput';
import CurrencySelect from './CurrencySelect';
import Info from './Info';
import walletShape from '../utils/commonPropTypes';
import styles from './ExchangeCard.module.scss';
import { formatMoney } from '../utils/currencyUtils';

function ExchangeCard({
  currency,
  wallets,
  amount,
  onCurrencyChange,
  onAmountChange,
  prefix,
  showMinimumAmountInfo,
  showExceedsBalance,
  minimumAmount,
  className
}) {
  const inputRef = useRef();

  const handleSelectOnExited = useCallback(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      input.focus();
      moveCursorToStart(input);
    }
  }, [inputRef]);

  const classes = cx(styles.card, className);
  const inputClasses = cx(styles.input, {
    [styles.exceedsInput]: showExceedsBalance
  });
  const wallet = wallets.find(w => w.currency === currency);

  return (
    <div className={classes}>
      <CurrencySelect
        currency={currency}
        wallets={wallets}
        onChange={onCurrencyChange}
        onExited={handleSelectOnExited}
        className={styles.walletSelect}
      />
      <FormattedInput
        value={amount}
        onChange={onAmountChange}
        prefix={prefix}
        inputRef={inputRef}
        className={inputClasses}
      />
      <BalanceInfo
        wallet={wallet}
        highlight={showExceedsBalance}
        className={styles.balance}
      />
      {showExceedsBalance && (
        <Info className={styles.info}>exceeds balance</Info>
      )}
      {showMinimumAmountInfo && (
        <Info className={styles.info} highlight>
          {`Minimum amount is ${formatMoney({
            amount: minimumAmount,
            currency
          })}`}
        </Info>
      )}
    </div>
  );
}

ExchangeCard.propTypes = {
  currency: PropTypes.string.isRequired,
  wallets: PropTypes.arrayOf(walletShape).isRequired,
  amount: PropTypes.number,
  onCurrencyChange: PropTypes.func,
  onAmountChange: PropTypes.func,
  showMinimumAmountInfo: PropTypes.bool,
  showExceedsBalance: PropTypes.bool,
  prefix: PropTypes.string,
  minimumAmount: PropTypes.number,
  className: PropTypes.string
};

ExchangeCard.defaultProps = {
  showMinimumAmountInfo: false,
  showExceedsBalance: false,
  minimumAmount: 0.1
};

/**
 * Helper which is needed when a user exits wallet select.
 * When input is focused, ut moves a cursor to the beginning of the input.
 * @param {Element} input - reference to the input
 */
function moveCursorToStart(input) {
  const { value } = input;
  input.value = '';
  input.value = value;
}

export default React.memo(ExchangeCard);
