import BigNumber from "bignumber.js";

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
}
