import PropTypes from 'prop-types';

const walletShape = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
});

export default walletShape;
