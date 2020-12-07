import '../public/css/layout.css';
import '../public/css/default.css';
import '../public/css/fonts.css';
import '../public/css/magnific-popup.css';
import '../public/css/media-queries.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import * as gtag from '../analytics/gtag';

// This default export is required in a new `pages/_app.js` file.
const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return <Component pageProps={pageProps} />;
};

MyApp.propTypes = {
  Component: PropTypes.element.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
