import { connect } from 'react-redux';
import ExchangePanel from '../components/ExchangePanel';
import {
  setSrcAmount,
  setSrcCurrency,
  setTargetAmount,
  setTargetCurrency,
  exchange
} from '../actions';

const mapStateToProps = ({
  srcCurrency,
  targetCurrency,
  srcAmount,
  targetAmount,
  wallets,
  rates
}) => ({
  srcCurrency,
  targetCurrency,
  srcAmount,
  targetAmount,
  wallets,
  rates
});

const mapDispatchToProps = dispatch => ({
  onSrcCurrencyChange: currency => dispatch(setSrcCurrency(currency)),
  onSrcAmountChange: amount => dispatch(setSrcAmount(amount)),
  onTargetCurrencyChange: currency => dispatch(setTargetCurrency(currency)),
  onTargetAmountChange: amount => dispatch(setTargetAmount(amount)),
  handleExchange: (...params) => dispatch(exchange(...params))
});

const ExchangePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangePanel);

export default ExchangePanelContainer;
