import React, { Component } from 'react';
import Image from 'next/image';

class About extends Component {
  render() {
    if (this.props.data) {
      var { name } = this.props.data;
      var profilepic = this.props.data.image;
      var { bio } = this.props.data;
      var { street } = this.props.data.address;
      var { city } = this.props.data.address;
      var { state } = this.props.data.address;
      var { zip } = this.props.data.address;
      var { phone } = this.props.data;
      var { email } = this.props.data;
      var resumeDownload = this.props.data.resumedownload;
    }

    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
          <img className="profile-pic"  src={profilepic} alt="Joshua King Profile Pic" />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>

            <p>{bio}</p>
            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>{name}</span>
                  <br />
                  <span>
                    {street}
                    <br />
                    {city}
                    {' '}
                    {state}
                    ,
                    {' '}
                    {zip}
                  </span>
                  <br />
                  <span>{phone}</span>
                  <br />
                  <span>{email}</span>
                </p>
              </div>
              <div className="columns download">
                <p>
                  <a href={resumeDownload} target="_blank" className="button" rel="noopener noreferrer">
                    <i className="fa fa-download" />
                    Download Resume
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}

export default About;
