import moment from "moment";

export function dateToTimestamp(date: string): number {
  return moment(date).unix();
}

export function timestampToDateString(ts: number): string {
  return moment.unix(ts).format("DD MMM YYYY HH:mm");
}
