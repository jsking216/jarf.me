import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Networks from './Networks';

const Header = (props) => {
  const {
    data,
  } = props;

  return (
    <header id="home">

      <nav id="nav-wrap">

        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
        <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

        <ul id="nav" className="nav">
          <li className="navlink"><a className="smoothscroll" href="#home">Home</a></li>
          <li className="navlink"><a className="smoothscroll" href="#about">About</a></li>
          <li className="navlink"><a className="smoothscroll" href="#resume">Resume</a></li>
          <li className="navlink"><Link href="/blog/main"><a>Blog</a></Link></li>
        </ul>

      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">
            I&apos;m
            {` ${data.name}`}
            .
          </h1>
          <h3>
            I&apos;m a
            <span>
              {` ${data.occupation}`}
              {' '}
              from
              {' '}
              {data.address.city}
              ,
              {' '}
              {data.address.state}
              .
            </span>
            {' '}
            {data.description}
            .
          </h3>
          <hr />
          <ul className="social">
            <Networks social={data.social} />
          </ul>
        </div>
      </div>

      <p className="scrolldown">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <a className="smoothscroll" href="#about"><i className="icon-down-circle" /></a>
      </p>

    </header>
  );
};

Header.propTypes = PropTypes.shape({
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}).isRequired;

export default Header;
