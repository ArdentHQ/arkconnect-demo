import "@/app/styles/globals.css";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useState } from "react";

import {
  ReactQueryClient,
  QueryClientProvider,
} from "@/app/contexts/ReactQuery";
import { AppFont } from "@/app/components/AppFont";
import ArkConnectContextProvider from "@/app/contexts/useArkConnectContext";
import { DarkModeProvider } from "@/app/contexts/useDarkModeContext";
import MetaMaskContextProvider from "@/app/contexts/MetaMaskContext";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => ReactQueryClient());

  return (
    <>
      <AppFont />
      <QueryClientProvider client={queryClient}>
        <MetaMaskContextProvider>
          <ArkConnectContextProvider>
            <DarkModeProvider>
              <Component {...pageProps} />
            </DarkModeProvider>
          </ArkConnectContextProvider>
        </MetaMaskContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default appWithTranslation(App);
