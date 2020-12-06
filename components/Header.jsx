import React, { Component } from 'react';
import Link from 'next/link';

class Header extends Component {
  render() {
    if (this.props.data) {
      var { name } = this.props.data;
      var { occupation } = this.props.data;
      var { description } = this.props.data;
      var { city } = this.props.data.address;
      var { state } = this.props.data.address;
      var networks = this.props.data.social.map((network) => <li key={network.name}><a href={network.url}><i className={network.className} /></a></li>);
    }

    return (
      <header id="home">

        <nav id="nav-wrap">

          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

          <ul id="nav" className="nav">
            <li className="navlink"><a className="smoothscroll" href="#home">Home</a></li>
            <li className="navlink"><a className="smoothscroll" href="#about">About</a></li>
            <li className="navlink"><a className="smoothscroll" href="#resume">Resume</a></li>
            <li className="navlink"><a className="smoothscroll" href="#contact">Contact</a></li>
            <li className="navlink"><Link href="/blog/main"><a>Blog</a></Link></li>
          </ul>

        </nav>

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">
              I'm
              {name}
              .
            </h1>
            <h3>
              I'm a
              <span>
                {occupation}
                {' '}
                from
                {' '}
                {city}
                ,
                {' '}
                {state}
                .
              </span>
              {' '}
              {description}
              .
            </h3>
            <hr />
            <ul className="social">
              {networks}
            </ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about"><i className="icon-down-circle" /></a>
        </p>

      </header>
    );
  }
}

export default Header;