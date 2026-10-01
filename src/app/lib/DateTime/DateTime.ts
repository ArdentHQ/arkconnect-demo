import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs plugins can only be registered this way, per dayjs's own API.
// eslint-disable-next-line unicorn/no-top-level-side-effects
dayjs.extend(relativeTime);

export function DateTime(date: string | number) {
  return {
    timeAgo() {
      return dayjs().to(date);
    },
  };
}
