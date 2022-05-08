import React from "react";
import "@celo-tools/use-contractkit/lib/styles.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { Alfajores, Mainnet , ContractKitProvider } from "@celo-tools/use-contractkit";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/state/index";
import AppUpdater from "@/state/app/updater";
import '../styles/global.scss';

function Updaters() {
  return (
    <>
      <AppUpdater />
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  const AnyComponent = Component as any;
  return (
    <Provider store={store}>
        <ContractKitProvider
          dapp={{
            name: "market place",
            description: "a commune marketplace based on Celo blockchain",
            url: "https://use-contractkit.vercel.app",
            icon: "https://use-contractkit.vercel.app/favicon.ico",
          }}
          networks={[Alfajores, Mainnet]}
          network={Alfajores}
        >
            <Updaters/>
            <ApolloProvider client={client}>
              <div suppressHydrationWarning>
                {typeof window === "undefined" ? null : (
                  <AnyComponent {...pageProps} />
                )}
              </div>
            </ApolloProvider>
        </ContractKitProvider>
    </Provider>
  );
}

export default MyApp;
