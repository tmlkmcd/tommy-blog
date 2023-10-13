export const PageName = {
  Blog: "Blog",
  Tags: "Tags",
  Tag: (tag?: string) => {
    return tag ? `Tag: ${truncate(tag)}` : "Tags";
  },
  Post: (post?: string) => {
    return post ? `Post: ${truncate(post)}` : "Post";
  },
  Series: "Series",
  SeriesGroup: (series?: string) => {
    return series ? `Series: ${truncate(series)}` : "Series";
  },
  About: "About",
  Music: "Music",
  Tech: "Tech",
  Contact: "Contact",
};

function truncate(name: string, length: number = 12): string {
  return name.length > length ? `${name.slice(0, length)}...` : name;
}
