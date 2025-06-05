export const useExtensionUrls = () => {
  const isFirefox = navigator.userAgent.includes("Firefox");
  const isChrome = navigator.userAgent.includes("Chrome");

  let arkExtensionUrl: string | undefined;
  let metaMaskExtensionUrl: string | undefined;

  if (isChrome) {
    arkExtensionUrl = process.env.ARK_CHROME_EXTENSION_URL;
    metaMaskExtensionUrl = process.env.METAMASK_CHROME_EXTENSION_URL;
  } else if (isFirefox) {
    arkExtensionUrl = process.env.ARK_FIREFOX_EXTENSION_URL;
    metaMaskExtensionUrl = process.env.METAMASK_FIREFOX_EXTENSION_URL;
  }

  return { arkExtensionUrl, metaMaskExtensionUrl };
};
