import "@/app/styles/globals.css";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  ReactQueryClient,
  QueryClientProvider,
} from "@/app/contexts/ReactQuery";
import { ModalContextProvider } from "@/app/contexts/ModalContext/ModalContext";
import { useAppFont } from "@/app/hooks/useAppFont";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => ReactQueryClient());

  const fontCssClass = useAppFont();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        <div className={fontCssClass}>
          <Component {...pageProps} />;
        </div>
      </ModalContextProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
