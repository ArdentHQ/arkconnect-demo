export {};

declare global {
  interface Window {
    arkconnect?: {
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
    };
  }
}
