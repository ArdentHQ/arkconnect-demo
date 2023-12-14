export const truncateFromMiddle = (
  fullStr = "",
  strLen: number,
  middleStr = "...",
) => {
  if (fullStr.length <= strLen) return fullStr;
  const midLen = middleStr.length;
  const charsToShow = strLen - midLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    middleStr +
    fullStr.substring(fullStr.length - backChars)
  );
};
