import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4FF00" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
