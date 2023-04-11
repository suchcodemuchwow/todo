import { formatDistance } from "date-fns";

export function getHumanReadableTime(due: string | undefined) {
  return formatDistance(new Date(due!), new Date(), {
    addSuffix: true,
  });
}
