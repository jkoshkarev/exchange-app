import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import indicatorStyles from './RateIndicator.module.scss';
import styles from './SwapCurrenciesButton.module.scss';

const StyledIconButton = withStyles(() => ({
  root: {
    backgroundColor: 'var(--base-background-color)',
    fontSize: 'var(--label-font-size)',
    color: 'var(--primary-color)',
    border: '1px solid var(--container-background-color)',
    '&:hover': {
      backgroundColor: '#c9ced2'
    },
    '&:active': {
      backgroundColor: '#a0a8af'
    },
    height: 'var(--icon-height)',
    width: 'var(--icon-height)'
  }
}))(IconButton);

const SwapCurrenciesButton = ({ onClick }) => (
  <div className={cx(indicatorStyles.betweenCards, styles.button)}>
    <StyledIconButton
      onClick={onClick}
      color="primary"
      size="small"
      disableRipple
    >
      <Icon fontSize="inherit">swap_vert</Icon>
    </StyledIconButton>
  </div>
);

SwapCurrenciesButton.propTypes = {
  onClick: PropTypes.func
};

export default React.memo(SwapCurrenciesButton);
