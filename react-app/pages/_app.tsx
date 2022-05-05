import React from "react";
import "@celo-tools/use-contractkit/lib/styles.css";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { Alfajores, ContractKitProvider } from "@celo-tools/use-contractkit";
import { AppProps } from "next/app";
import { Provider } from "react-redux"
import store from "@/state/index"
import AppUpdater from "@/state/app/updater"
import 'bootstrap/dist/css/bootstrap.css';

function Updaters() {
  return (
    <>
      <AppUpdater />
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <Provider store={store}>
        <ContractKitProvider
          dapp={{
            name: "use-contractkit demo",
            description: "A demo DApp to showcase functionality",
            url: "https://use-contractkit.vercel.app",
            icon: "https://use-contractkit.vercel.app/favicon.ico",
          }}
          network={Alfajores}
        >
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Updaters/>
            <ApolloProvider client={client}>
              <div suppressHydrationWarning>
                {typeof window === "undefined" ? null : (
                  <Component {...pageProps} />
                )}
              </div>
            </ApolloProvider>
          </SnackbarProvider>
        </ContractKitProvider>
    </Provider>
  );
}

export default MyApp;
