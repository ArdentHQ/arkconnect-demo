import { ArkConnectExtension } from "@/app/lib/Network";

export {};

declare global {
  interface Window {
    arkconnect?: ArkConnectExtension;
  }
}
