export const formatDateTime = (date: string): string => {
  const d = new Date(date);
  const dateString = d.toLocaleDateString();
  const time = d.toLocaleTimeString();
  return `${dateString} ${time}`;
};

export const formatBlogDate = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const dayOfWeek = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const year = `'${d.getUTCFullYear().toString().slice(2)}`;
  const currentYear = `'${now.getUTCFullYear().toString().slice(2)}`;

  if (year !== currentYear || true) {
    return `${dayOfWeek}, ${day} ${month} ${year}`.toLowerCase();
  }

  return `${dayOfWeek}, ${day} ${month}`.toLowerCase();
};

export const getTime = (date: string): string => {
  const d = new Date(date);
  const hours = padNumber(d.getHours(), 2);
  const minutes = padNumber(d.getMinutes(), 2);
  return `${hours}:${minutes}`;
};

function padNumber(num: number | string, length: number = 2): string {
  let str = num.toString();
  while (str.length < length) {
    str = `0${str}`;
  }
  return str;
}
