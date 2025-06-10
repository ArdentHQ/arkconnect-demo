import { BigNumber } from "bignumber.js";

export const WEI_MULTIPLIER = 1;
export const GWEI_MULTIPLIER = 1e9;
export const ARK_MULTIPLIER = 1e18;

export type NumberLike = string | number | BigNumber;
export class CurrencyFormatter {
  public static simpleFormatCrypto(value: NumberLike, token: string): string {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${value} ${token}`;
  }

  public static cryptoToCurrency(
    value: NumberLike,
    price: NumberLike,
    options?: { decimals: number },
  ): string {
    const decimals = options?.decimals ?? 2;

    return new BigNumber(value)
      .decimalPlaces(decimals)
      .times(price)
      .toFixed(decimals);
  }

  public static formatUnits(value: string, unit = "ark"): BigNumber {
    switch (unit.toLowerCase()) {
      case "wei": {
        return BigNumber(value).dividedBy(WEI_MULTIPLIER);
      }
      case "gwei": {
        return BigNumber(value).dividedBy(GWEI_MULTIPLIER);
      }
      case "ark": {
        return BigNumber(value).dividedBy(ARK_MULTIPLIER);
      }
      default: {
        throw new Error(
          `Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`,
        );
      }
    }
  }
}
