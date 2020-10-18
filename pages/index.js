import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';
import Contact from '../components/Contact';
import Resume from '../components/Resume';
import Head from 'next/head';

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
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <title>Jarf.me | Joshua King</title>
      </Head>
      <Header data={props.resumeData.main}/>
      <About data={props.resumeData.main}/>
      <Resume data={props.resumeData.resume}/>
      <Contact data={props.resumeData.main}/>
      <Footer data={props.resumeData.main}/>
    </div>
  );
};

export default Home;