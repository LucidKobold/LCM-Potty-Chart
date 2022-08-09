import React from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../lib/apollo";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "../theme/AppTheme";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Layout from "../theme/layout/Layout";
import Head from "next/head";

function LCMPottyChart({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps): JSX.Element {
  return (
    <React.StrictMode>
      <ChakraProvider theme={AppTheme}>
        <SessionProvider session={session}>
          <ApolloProvider client={apolloClient}>
            <Layout {...pageProps}>
              <Head>
                <title>{"LCM Potty Chart"}</title>
                <meta
                  name="viewport"
                  content="width=device-width, user-scalable=yes, initial-scale=1.0"
                />
              </Head>
              <Provider store={store}>
                <Component {...pageProps} />
              </Provider>
            </Layout>
          </ApolloProvider>
        </SessionProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default LCMPottyChart;
