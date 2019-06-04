import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import ExchangePanelContainer from './containers/ExchangePanelContainer';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <h4 className={styles.header}>Exchange</h4>
      <Provider store={store}>
        <ExchangePanelContainer />
      </Provider>
    </div>
  );
}

export default App;
