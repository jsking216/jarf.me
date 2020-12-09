import React from 'react';
import PropTypes from 'prop-types';

const Networks = (props) => {
  const {
    social,
  } = props;

  // eslint-disable-next-line max-len, jsx-a11y/control-has-associated-label
  const networks = social.map((network) => <li key={network.name}><a href={network.url}><i className={network.className} /></a></li>);

  return (
    <>
      {networks}
    </>
  );
};

Networks.propTypes = PropTypes.shape({
  social: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}).isRequired;

export default Networks;
