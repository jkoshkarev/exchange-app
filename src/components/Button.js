import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const StyledButton = withStyles(() => ({
  root: {
    backgroundColor: 'var(--highlight-color)',
    color: 'var(--base-background-color)',
    '&:hover': {
      backgroundColor: '#e00087'
    },
    '&:active': {
      backgroundColor: '#d50081'
    },
    width: '100%',
    fontSize: '1rem',
    height: '2rem',
    textTransform: 'none',
    '&:disabled': {
      opacity: 0.2,
      backgroundColor: 'var(--highlight-color)',
      color: 'var(--base-background-color)'
    }
  }
}))(Fab);

const Button = ({ children, onClick, disabled }) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    disableRipple
    variant="extended"
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};

export default React.memo(Button);
