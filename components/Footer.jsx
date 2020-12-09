import React from 'react';
import PropTypes from 'prop-types';
import Networks from './Networks';

const Footer = (props) => {
  const {
    data: {
      social,
    },
  } = props;

  return (
    <footer>

      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">
            <Networks social={social} />
          </ul>

          <ul className="copyright">
            <li>
              &copy; Copyright
              {` ${(new Date().getFullYear())}`}
              {' '}
              Joshua King
            </li>
            <li>
              Design by
              <a title="Styleshout" href="http://www.styleshout.com/">Styleshout</a>
            </li>
          </ul>

        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open" /></a></div>
      </div>
    </footer>
  );
};

Footer.propTypes = PropTypes.shape({
  social: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}).isRequired;

export default Footer;
