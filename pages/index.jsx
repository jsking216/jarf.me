import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';
import Resume from '../components/Resume';
import {
  metas, links, htmlAttributes, baseUrl,
} from '../seo/meta';

const resumeData = require('../public/resumeData.json');

export async function getStaticProps() {
  return {
    props: {
      resumeData,
    },
  };
}

const Home = (props) => {
  const pageMetas = () => {
    const meta = [
      {
        property: 'og:description',
        content: "jarf.me - Joshua King's personal page",
      },
      {
        name: 'description',
        content: "jarf.me - Joshua King's personal page",
      },
      { property: 'og:type', content: 'profile' },
      { property: 'og:image', content: `${baseUrl}/images/profilepic.webp` },
      { property: 'og:updated_time', content: '2020-10-17T20:20:40-04:00' },
      { property: 'profile:first_name', content: 'Joshua' },
      { property: 'profile:last_name', content: 'King' },
      { property: 'profile:username', content: 'jarf' },
      {
        property: 'og:url',
        content: baseUrl,
      },
      { property: 'og:title', content: 'Jarf.me | Joshua King' },
    ];
    meta.concat(metas);
    return meta;
  };

  const pageLinks = () => {
    const link = [{ rel: 'canonical', href: baseUrl }];
    link.concat(links);
    return link;
  };

  const {
    pageProps: {
      resumeData: {
        main,
        resume,
      },
    },
  } = props;

  return (
    <div className="App">
      <Helmet
        html={htmlAttributes}
        title="jarf.me | Joshua King"
        meta={pageMetas()}
        link={pageLinks()}
      />
      <Header data={main} />
      <About data={main} />
      <Resume data={resume} />
      <Footer data={main} />
    </div>
  );
};

Home.propTypes = PropTypes.shape({
  main: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
    bio: PropTypes.string.isRequired,
    contactmessage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    resumedownload: PropTypes.string.isRequired,
    social: PropTypes.arrayOf(PropTypes.shape({
      className: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
  resume: PropTypes.shape({
    education: PropTypes.arrayOf(PropTypes.shape({
      degree: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      graduated: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    skillmessage: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.shape({
      level: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    work: PropTypes.arrayOf(PropTypes.shape({
      company: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      years: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
}).isRequired;

export default Home;
