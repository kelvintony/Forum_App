import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import Router from 'next/router';
import Navbar from '../components/Navbar/Navbar';

import Loader from '../components/Loader/Loader';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('finished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <SessionProvider session={pageProps.session}>
      {loading ? <Loader /> : <Component {...pageProps} />}
      {/* <Navbar /> */}
      {/* <Component {...pageProps} /> */}
    </SessionProvider>
  );
}

export default MyApp;
