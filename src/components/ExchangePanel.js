import React from 'react';
import PropTypes from 'prop-types';
import ExchangeCard from './ExchangeCard';
import walletShape from '../utils/commonPropTypes';
import styles from './ExchangePanel.module.scss';
import RateIndicator from './RateIndicator';
import SwapCurrenciesButton from './SwapCurrenciesButton';
import Button from './Button';

function ExchangePanel({
  srcCurrency,
  targetCurrency,
  srcAmount,
  targetAmount,
  onSrcAmountChange,
  onTargetAmountChange,
  wallets,
  rates,
  onSrcCurrencyChange,
  onTargetCurrencyChange,
  handleExchange,
  minAmount
}) {
  if (!rates) {
    return null;
  }
  const showMinimumAmountInfo = srcAmount > 0 && srcAmount < minAmount;

  const srcWallet = wallets.find(w => w.currency === srcCurrency);
  const showExceedsBalance =
    !showMinimumAmountInfo && srcAmount > srcWallet.amount;
  const canExchange =
    !showExceedsBalance && !showMinimumAmountInfo && srcAmount > 0;

  return (
    <div className={styles.container}>
      <ExchangeCard
        currency={srcCurrency}
        wallets={wallets}
        amount={srcAmount}
        onAmountChange={onSrcAmountChange}
        onCurrencyChange={onSrcCurrencyChange}
        showMinimumAmountInfo={showMinimumAmountInfo}
        showExceedsBalance={showExceedsBalance}
        prefix="- "
        className={styles.srcCard}
      />
      <SwapCurrenciesButton
        onClick={() => onSrcCurrencyChange(targetCurrency)}
      />
      <RateIndicator
        srcCurrency={srcCurrency}
        targetCurrency={targetCurrency}
        rates={rates}
      />
      <ExchangeCard
        currency={targetCurrency}
        wallets={wallets}
        amount={targetAmount}
        onAmountChange={onTargetAmountChange}
        onCurrencyChange={onTargetCurrencyChange}
        prefix="+ "
      />
      <div className={styles.button}>
        <Button
          onClick={() =>
            handleExchange({
              srcAmount,
              srcCurrency,
              targetAmount,
              targetCurrency
            })
          }
          disabled={!canExchange}
        >
          Exchange
        </Button>
      </div>
    </div>
  );
}

ExchangePanel.propTypes = {
  srcCurrency: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
  srcAmount: PropTypes.number,
  targetAmount: PropTypes.number,
  wallets: PropTypes.arrayOf(walletShape).isRequired,
  onSrcCurrencyChange: PropTypes.func,
  onTargetCurrencyChange: PropTypes.func,
  onSrcAmountChange: PropTypes.func,
  onTargetAmountChange: PropTypes.func,
  handleExchange: PropTypes.func,
  rates: PropTypes.object,
  minAmount: PropTypes.number
};

ExchangePanel.defaultProps = {
  minAmount: 0.1
};

export default React.memo(ExchangePanel);
