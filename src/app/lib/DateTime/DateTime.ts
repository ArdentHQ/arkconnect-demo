import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function DateTime(date: string | number) {
  return {
    timeAgo() {
      return dayjs().to(date);
    },
  };
}
