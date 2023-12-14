interface Properties {
  text?: string;
  length: number;
  separator?: string;
  className?: string;
}

export const TruncateMiddle = ({
  text,
  length,
  separator = "…",
  className,
}: Properties): JSX.Element => {
  if (text === undefined) {
    return <></>;
  }

  if (text.length <= length) {
    return <span className={className}>{text}</span>;
  }

  const partLength = Math.floor(length / 2);

  return (
    <span className={className}>
      {[
        text.slice(0, Math.max(0, partLength)),
        text.slice(Math.max(0, text.length - partLength)),
      ].join(separator)}
    </span>
  );
};
