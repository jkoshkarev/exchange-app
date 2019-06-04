import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { formatMoney, convert } from '../utils/currencyUtils';
import styles from './RateIndicator.module.scss';

const StyledChip = withStyles(() => ({
  root: {
    backgroundColor: 'var(--base-background-color)',
    fontSize: 'var(--label-font-size)',
    color: 'var(--primary-color)',
    borderColor: 'var(--container-background-color)',
    height: '100%',
    width: '100%'
  }
}))(Chip);

/**
 * Displays a rate for a given currency pair;
 * (e.g. `$1 = €0.8475`)
 */
function RateIndicator({ srcCurrency, targetCurrency, rates, precision }) {
  const srcCurrencyValue = formatMoney(
    { amount: 1, currency: srcCurrency },
    { maximumSignificantDigits: 1 }
  );

  function renderTargetCurrencyValue() {
    const toNumber = convert(1, srcCurrency, targetCurrency, rates, precision);
    return formatMoney(
      { amount: toNumber, currency: targetCurrency },
      { maximumSignificantDigits: precision }
    );
  }

  const targetCurrencyValue = renderTargetCurrencyValue();

  return (
    <div className={cx(styles.betweenCards, styles.indicator)}>
      <StyledChip
        label={`${srcCurrencyValue} = ${targetCurrencyValue}`}
        icon={<Icon fontSize="inherit">trending_up</Icon>}
        color="primary"
        variant="outlined"
      />
    </div>
  );
}

RateIndicator.propTypes = {
  srcCurrency: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
  rates: PropTypes.object.isRequired,
  precision: PropTypes.number
};

RateIndicator.defaultProps = {
  precision: 4
};

export default React.memo(RateIndicator);
