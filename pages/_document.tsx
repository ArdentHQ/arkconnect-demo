import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#058751" />
        <meta name="msapplication-TileColor" content="#058751" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

        <meta
          name="description"
          content="Discover the power of ARK Connect with our demo app. Seamlessly interact with your ARK addresses: effortlessly view balances, track latest transactions, initiate transfers, sign messages, and even vote for delegates."
        />
        <meta property="og:title" content="Demo App | ARK Connect" />
        <meta
          property="og:description"
          content="Discover the power of ARK Connect with our demo app. Seamlessly interact with your ARK addresses: effortlessly view balances, track latest transactions, initiate transfers, sign messages, and even vote for delegates."
        />
        <meta
          property="og:image"
          content="https://demo.arkconnect.io/images/meta/home.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Demo App | ARK Connect" />
        <meta
          name="twitter:description"
          content="Discover the power of ARK Connect with our demo app. Seamlessly interact with your ARK addresses: effortlessly view balances, track latest transactions, initiate transfers, sign messages, and even vote for delegates."
        />
        <meta
          name="twitter:image"
          content="https://demo.arkconnect.io/images/meta/home.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
