import type {
  Asset,
  Entry,
  RichTextContent,
  EntryFields,
  Sys,
} from "contentful";

export type ImageAsset = {
  caption: string;
  picture: Asset;
  imageType: string;
  imageTag: string;
};

export function isFootnote(
  content: EntryFields.RichText | RichTextContent
): boolean {
  return (
    ((content as RichTextContent).data.target?.sys as unknown as Sys)
      ?.contentType?.sys.id === "footnote"
  );
}

export function isHeader(
  content: EntryFields.RichText | RichTextContent
): number | null {
  switch (content.nodeType) {
    case "heading-1":
      return 1;
    case "heading-2":
      return 2;
    case "heading-3":
      return 3;
    case "heading-4":
      return 4;
    case "heading-5":
      return 5;
    case "heading-6":
      return 6;
    default:
      return null;
  }
}

export function isInternalLink(
  content: EntryFields.RichText | RichTextContent
): boolean {
  return (
    ((content as RichTextContent).data.target?.sys as unknown as Sys)
      ?.contentType?.sys.id === "internalLink"
  );
}

export function isGhGist(
  content: EntryFields.RichText | RichTextContent
): boolean {
  return (
    ((content as RichTextContent).data.target?.sys as unknown as Sys)
      ?.contentType?.sys.id === "githubGist"
  );
}

export interface Banner {
  header: string;
  subtitle?: string;
  link?: string;
  images: Asset[];
  isInternal: boolean;
  imageAlignment: "Top" | "Bottom" | "Left" | "Right";
}

export interface BlogPost {
  id: number;
  title: string;
  blurb: string;
  slug: string;
  published: string;
  categories: Entry<Category>[];
  post: EntryFields.RichText;
  bannerImages: Entry<{
    title: string;
    fullBannerImage: Asset;
    previewBannerImage: Asset;
  }>;
  series?: Entry<Series>;
  youtubeVideoId?: string;
}

export interface PaginationInfo {
  page: number;
  total: number;
}

export interface ContentsItem {
  id: string;
  title: string;
  subItems?: ContentsItem[];
}

export interface HeadingItem {
  level: number;
  heading: string;
}

export interface ExtendedBlogPost extends BlogPost {
  updated?: string;
  footnotes?: string[];
  headings?: HeadingItem[];
  contents?: ContentsItem[];
}

export interface Category {
  id: number;
  name: string;
  image: Asset;
}

export interface Footnote {
  title: string;
  text: EntryFields.RichText;
  index?: number;
}

export interface InternalLink {
  inlineText: string;
  name: string;
  to?: string;
  blogPostReference?: Entry<BlogPost>;
}

export interface Paragraph {
  identifier: string;
  text: EntryFields.RichText;
  title: string;
}

export interface GithubGist {
  title: string;
  id: string;
  isBigCode: boolean;
  tooltip?: string;
}

export interface Series {
  name: string;
  description: string;
  numberOfPosts: number;
  slug: string;
  image: Asset;
}

export interface CoreSkill {
  name: string;
  blurb: string;
  subskill: string[];
  order: number;
}

export interface TruthAndLie {
  isReal: boolean;
  detail: string;
  explanation: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Band {
  name: string;
  description: EntryFields.RichText;
  colourHex: string;
  fontColourHex: string;
  mainLink: string;
  gallery: Asset[];
  order: number;
}
