// import '../styles/globals.scss'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp


import App from 'next/app';
import React from 'react';
import Head from 'next/head';
// import getConfig from 'next/config';
// import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../redux/store';
// import Notification from '../common/components/Notification';
// import { locale as localeConstants } from '../common/constants';
// import getTranslations from '../locales';
// import Icon from '../common/components/Icon';

import '../styles/globals.scss';

// const { publicRuntimeConfig } = getConfig();

class ShoppingCart extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ctx }) : {};
  //   // anything returned here can be access by the client
  //   return { pageProps };
  // }

  render() {
    const { Component, pageProps, store } = this.props;
    // const { locale } = publicRuntimeConfig;
    const {
      View = React.Fragment, Layout = React.Fragment, RouteGuard = React.Fragment,
    } = Component;
    // note: update here as change local get implemented over app.
    // const localeName = localeConstants[locale];
    // const translations = getTranslations(localeName);
    return (
      <Provider store={store}>
        <Head>
          <title>Shopping Cart</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossOrigin=""
          /> */}
        </Head>
        {/* <IntlProvider locale={localeName} messages={translations} textComponent={React.Fragment}> */}
          {/* <Notification components={{ Icon }} /> */}
          <RouteGuard>
            <Layout>
              <View {...pageProps} />
            </Layout>
          </RouteGuard>
         {/* </IntlProvider> */}
      </Provider>
    );
  }
}

// withRedux wrapper that passes the store to the App Component
export default withRedux(createStore)(ShoppingCart);
