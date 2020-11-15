import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';
import Contact from '../components/Contact';
import Resume from '../components/Resume';
import { metas, links, htmlAttributes, baseUrl } from '../seo/meta';
import Helmet from 'react-helmet';

export async function getStaticProps() {
  const resumeData = require('../public/resumeData.json');
  return {
      props: {
        resumeData
      }
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
    { property: 'og:image', content: `${baseUrl}/images/profilepic.jpg` },
    { property: 'og:updated_time', content: '2020-10-17T20:20:40-04:00' },
    { property: 'profile:first_name', content: 'Joshua' },
    { property: 'profile:last_name', content: 'King' },
    { property: 'profile:username', content: 'jarf' },
    {
      property: 'og:url',
      content: baseUrl,
    },
    { property: 'og:title', content: "Jarf.me | Joshua King" },
    ];
    meta.concat(metas);
    return meta;
  };

  const pageLinks = () => {
    const link = [{ rel: 'canonical', href: baseUrl }];
    link.concat(links);
    return link;
  }

  return(
    <div className="App">
      <Helmet
        { ...htmlAttributes }
        title="jarf.me | Joshua King"
        meta={pageMetas()}
        link={pageLinks()}
      />
      <Header data={props.resumeData.main}/>
      <About data={props.resumeData.main}/>
      <Resume data={props.resumeData.resume}/>
      <Contact data={props.resumeData.main}/>
      <Footer data={props.resumeData.main}/>
    </div>
  );
};

export default Home;