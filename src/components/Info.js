import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Info.module.scss';

export default function Info({ children, highlight, className }) {
  const classes = cx(styles.balanceDisplay, className, {
    [styles.highlight]: highlight
  });
  return <span className={classes}>{children}</span>;
}

Info.propTypes = {
  children: PropTypes.node,
  highlight: PropTypes.bool,
  className: PropTypes.string
};

Info.defaultProps = {
  highlight: false
};
