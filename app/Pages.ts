export enum AboutPages {
  SKILLSET = "skillset",
  FAQ = "faq",
  TTAAL = "ttaal",
}

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
  AboutPages: (page: AboutPages) => {
    switch (page) {
      case AboutPages.SKILLSET:
        return "My Skills";
      case AboutPages.FAQ:
        return "FAQ";
      case AboutPages.TTAAL:
        return "Two truths and a Lie";
    }
  },
  Music: "Music",
  Tech: "Tech",
  Contact: "Contact",
};

function truncate(name: string, length: number = 12): string {
  return name.length > length ? `${name.slice(0, length)}...` : name;
}
