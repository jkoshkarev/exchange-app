import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import pollRates from './reducers/sagas';

const wallets = [
  {
    amount: 123.23,
    currency: 'USD'
  },
  {
    amount: 1000.48,
    currency: 'EUR'
  },
  {
    amount: 10,
    currency: 'GBP'
  }
];

const initialState = {
  wallets,
  srcCurrency: wallets[0].currency,
  targetCurrency: wallets[2].currency
};

const reduxDevTool =
  process.env.NODE_ENV === 'production'
    ? null
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = reduxDevTool || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(pollRates);

export default store;
