import { DateTime } from "luxon";

export const formatDate = (date, hour, timezone) => {
  return DateTime.fromISO(date, { zone: timezone }).set({
    hour,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
};

export const getServerTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
