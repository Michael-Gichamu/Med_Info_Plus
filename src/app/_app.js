import { GoogleAdSense } from "nextjs-google-adsense";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAdSense publisherId="pub-4817769699396256" />
      <Component {...pageProps} />
    </>
  );
};

export default App;
