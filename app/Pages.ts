export const PageName = {
  Blog: "Blog",
  Tags: "Tags",
  Tag: (tag?: string) => {
    return tag ? `Tag: ${tag}` : "Tags";
  },
  Post: (post?: string) => {
    return post ? `Post: ${post}` : "Post";
  },
  Series: "Series",
  About: "About",
  Music: "Music",
  Tech: "Tech",
  Contact: "Contact",
};
