import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Contact = (props) => {
  const {
    data,
  } = props;

  return (
    <section id="contact">

      <div className="row section-head">

        <div className="two columns header-col">

          <h1><span>Get In Touch.</span></h1>

        </div>

        <div className="ten columns">

          <p className="lead">{data.contactmessage}</p>

        </div>

      </div>

      <div className="row">
        <div className="eight columns">

          <form action="" method="post" id="contactForm" name="contactForm">
            <fieldset>

              <div>
                <label htmlFor="contactName">
                  Name
                  <span className="required">*</span>
                  <input type="text" defaultValue="" size="35" id="contactName" name="contactName" />
                </label>
              </div>

              <div>
                <label htmlFor="contactEmail">
                  Email
                  <span className="required">*</span>
                  <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" />
                </label>
              </div>

              <div>
                <label htmlFor="contactSubject">
                  Subject
                  <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" />
                </label>
              </div>

              <div>
                <label htmlFor="contactMessage">
                  Message
                  <span className="required">*</span>
                  <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" />
                </label>
              </div>

              <div>
                <button type="submit" className="submit">Submit</button>
                <span id="image-loader">
                  <Image alt="" src="/images/loader.gif" layout="fill" />
                </span>
              </div>
            </fieldset>
          </form>

          <div id="message-warning"> Error boy</div>
          <div id="message-success">
            <i className="fa fa-check" />
            Your message was sent, thank you!
            <br />
          </div>
        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">

            <h4>Address and Phone</h4>
            <p className="address">
              {data.address.name}
              <br />
              {data.address.street}
              {' '}
              <br />
              {data.address.city}
              ,
              {data.address.state}
              {' '}
              {data.address.zip}
              <br />
              <span>{data.phone}</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

Contact.propTypes = PropTypes.shape({
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }).isRequired,
  contactmessage: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}).isRequired;

export default Contact;
