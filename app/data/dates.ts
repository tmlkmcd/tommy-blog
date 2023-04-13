export const formatDateTime = (date: string): string => {
  const d = new Date(date);
  const dateString = d.toLocaleDateString();
  const time = d.toLocaleTimeString();
  return `${dateString} ${time}`;
};

export const formatBlogDate = (
  date: string,
  showYear: boolean = false
): string => {
  const d = new Date(date);
  const dayOfWeek = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getUTCFullYear().toString().slice(2);

  if (showYear) {
    return `${dayOfWeek}, ${day} ${month} ${year}`.toLowerCase();
  }

  return `${dayOfWeek}, ${day} ${month}`.toLowerCase();
};

export const getTime = (date: string): string => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${hours}:${minutes}`;
};
