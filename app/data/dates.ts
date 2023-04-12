export const formatDateTime = (date: string): string => {
  const d = new Date(date);
  const dateString = d.toLocaleDateString();
  const time = d.toLocaleTimeString();
  return `${dateString} ${time}`;
};

export const formatBlogDate = (date: string): string => {
  const d = new Date(date);
  const dayOfWeek = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();

  return `${dayOfWeek}, ${month} ${day}, ${year}`.toLowerCase();
};
