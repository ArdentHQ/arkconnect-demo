import { Label } from "@/app/components/Label";
import { Link } from "@/app/components/Link";
import { TruncateMiddle } from "@/app/components/Truncate";
import { Transaction } from "@/app/lib/Transaction/factory";
import { useTranslation } from "next-i18next";

const TransactionAddressLink = ({
  address,
  href,
}: {
  address: string;
  href: string;
}) => {
  return (
    <Link href={href} target="_blank" className="w-[110px] block">
      <TruncateMiddle>{address}</TruncateMiddle>
    </Link>
  );
};

export const TransactionAmount = ({
  transaction,
}: {
  transaction: ReturnType<typeof Transaction>;
}) => {
  const { t } = useTranslation();

  if (transaction.isSent()) {
    return (
      <Label variant="warning" className="text-sm">
        {t("MINUS")} {transaction.amount().toCrypto()}
      </Label>
    );
  }

  return (
    <Label variant="success" className="text-sm">
      {t("PLUS")} {transaction.amount().toCrypto()}
    </Label>
  );
};

// TODO: Cleanup & reduce cognitive complexity.
export const TransactionAddress = ({
  transaction,
}: {
  transaction: ReturnType<typeof Transaction>;
}) => {
  const { t } = useTranslation();

  if (transaction.isContract()) {
    return (
      <>
        <Label variant="warning" className="text-xs">
          {t("TO")}{" "}
        </Label>
        <span className="text-black text-sm font-medium">{t("Contract")}</span>
      </>
    );
  }

  if (transaction.isMultipay()) {
    return (
      <>
        <Label variant="success" className="text-xs">
          {t("FROM")}{" "}
        </Label>
        <span className="text-black text-sm font-medium">
          {t("MULTIPLE")} ({transaction.recipients().length})
        </span>
      </>
    );
  }

  if (transaction.isTransfer() && !transaction.isMultipay()) {
    if (transaction.isReceived()) {
      return (
        <>
          <Label variant="success" className="text-xs">
            {t("FROM")}{" "}
          </Label>

          <TransactionAddressLink
            address={transaction.sender()}
            href={transaction.senderExplorerLink()}
          />
        </>
      );
    }

    if (transaction.isSent()) {
      return (
        <>
          <Label variant="warning" className="text-xs">
            {t("TO")}{" "}
          </Label>
          <TransactionAddressLink
            address={transaction.recipient()}
            href={transaction.recipientExplorerLink()}
          />
        </>
      );
    }
  }

  if (transaction.isVote()) {
    if (transaction.isReceived()) {
      return (
        <>
          <Label variant="success" className="text-xs">
            {t("FROM")}{" "}
          </Label>
          <TransactionAddressLink
            address={transaction.sender()}
            href={transaction.senderExplorerLink()}
          />
        </>
      );
    }

    if (transaction.isSent()) {
      return (
        <>
          <Label variant="warning" className="text-xs">
            {t("TO")}{" "}
          </Label>
          <TransactionAddressLink
            address={transaction.sender()}
            href={transaction.senderExplorerLink()}
          />
        </>
      );
    }
  }

  return <></>;
};
