import '../public/css/layout.css';
import '../public/css/default.css';
import '../public/css/fonts.css';
import '../public/css/magnific-popup.css';
import '../public/css/media-queries.css';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../analytics/gtag'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return <Component {...pageProps} />
}