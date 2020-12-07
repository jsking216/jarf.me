import React, { Component } from 'react';
import Image from 'next/image';

class Contact extends Component {
  render() {
    if (this.props.data) {
      var { name } = this.props.data;
      var { street } = this.props.data.address;
      var { city } = this.props.data.address;
      var { state } = this.props.data.address;
      var { zip } = this.props.data.address;
      var { phone } = this.props.data;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

        <div className="row section-head">

          <div className="two columns header-col">

            <h1><span>Get In Touch.</span></h1>

          </div>

          <div className="ten columns">

            <p className="lead">{message}</p>

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
                  </label>
                  <input type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange} />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Email
                    <span className="required">*</span>
                  </label>
                  <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange} />
                </div>

                <div>
                  <label htmlFor="contactSubject">Subject</label>
                  <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange} />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message
                    <span className="required">*</span>
                  </label>
                  <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" />
                </div>

                <div>
                  <button className="submit">Submit</button>
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
                {name}
                <br />
                {street}
                {' '}
                <br />
                {city}
                ,
                {state}
                {' '}
                {zip}
                <br />
                <span>{phone}</span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    );
  }
}

export default Contact;
