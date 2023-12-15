import "@/app/styles/globals.css";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useState } from "react";

import {
  ReactQueryClient,
  QueryClientProvider,
} from "@/app/contexts/ReactQuery";
import { AppFont } from "@/app/components/AppFont";
import { ModalContextProvider } from "@/app/contexts/ModalContext/ModalContext";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => ReactQueryClient());

  return (
    <>
      <AppFont />
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          <Component {...pageProps} />
        </ModalContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default appWithTranslation(App);
