import React from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
  const {
    data,
  } = props;

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img className="profile-pic" src={data.image} alt="Joshua King Profile Pic" />
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>
          <p>{data.bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{data.name}</span>
                <br />
                <span>
                  {data.address.street}
                  <br />
                  {data.address.city}
                  {' '}
                  {data.address.state}
                  ,
                  {' '}
                  {data.address.zip}
                </span>
                <br />
                <span>{data.phone}</span>
                <br />
                <span>{data.email}</span>
              </p>
            </div>
            <div className="columns download">
              <p>
                <a href={data.resumeDownload} target="_blank" className="button" rel="noopener noreferrer">
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
};

About.propTypes = PropTypes.shape({
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }).isRequired,
  bio: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  resumedownload: PropTypes.string.isRequired,
}).isRequired;
export default About;
