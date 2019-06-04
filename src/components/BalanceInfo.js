import React from 'react';
import PropTypes from 'prop-types';
import { formatMoney } from '../utils/currencyUtils';
import Info from './Info';
import walletShape from '../utils/commonPropTypes';

function BalanceInfo({ wallet, highlight, className }) {
  const formattedMoney = formatMoney(wallet);
  const message = `Balance: ${formattedMoney}`;
  return (
    <Info highlight={highlight} className={className}>
      {message}
    </Info>
  );
}

BalanceInfo.propTypes = {
  wallet: walletShape,
  highlight: PropTypes.bool,
  className: PropTypes.string
};

BalanceInfo.defaultProps = Info.defaultProps;

export default React.memo(BalanceInfo);
