import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';
import Contact from '../components/Contact';
import Resume from '../components/Resume';
import { metas, links, htmlAttributes } from '../seo/meta';
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
  return(
    <div className="App">
      <Helmet
        { ...htmlAttributes }
        title="Jarf.me | Joshua King"
        meta={metas}
        link={links}
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