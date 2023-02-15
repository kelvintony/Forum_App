import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import React from 'react';
import Router, { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import Layout from '../components/Layout';

import NextNProgress from 'nextjs-progressbar';

import { StoreProvider } from '../context';

import Loader from '../components/Loader/Loader';

function MyApp({ Component, pageProps }) {
  // const [loading, setLoading] = React.useState(false);
  // React.useEffect(() => {
  //   const start = () => {
  //     console.log('start');
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     console.log('finished');
  //     setLoading(false);
  //   };
  //   Router.events.on('routeChangeStart', start);
  //   Router.events.on('routeChangeComplete', end);
  //   Router.events.on('routeChangeError', end);
  //   return () => {
  //     Router.events.off('routeChangeStart', start);
  //     Router.events.off('routeChangeComplete', end);
  //     Router.events.off('routeChangeError', end);
  //   };
  // }, []);
  return (
    <StoreProvider>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <NextNProgress
            color='#29D'
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />

          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </SessionProvider>
    </StoreProvider>
  );
}
function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/');
  }

  return children;
}
export default MyApp;
