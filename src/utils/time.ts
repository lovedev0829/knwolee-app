import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const timeAgo = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  return formatDistanceToNow(date, { addSuffix: true });
}

export const DATETIME_LOCAL_FORMAT = "yyyy-MM-dd'T'HH:mm";
