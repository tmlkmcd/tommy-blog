import type {
  Asset,
  Entry,
  RichTextContent,
  EntryFields,
  Sys,
} from "contentful";

export interface DisplayPicture {
  caption: string;
  picture: Asset;
}

export function isFootnote(
  content: EntryFields.RichText | RichTextContent
): boolean {
  return (
    ((content as RichTextContent).data.target?.sys as unknown as Sys)
      ?.contentType?.sys.id === "footnote"
  );
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

export interface BlogPost {
  id: number;
  title: string;
  blurb: string;
  slug: string;
  categories: Entry<Category>[];
  post: EntryFields.RichText;
  image: Asset;
  series?: Entry<Series>;
}

export interface ExtendedBlogPost extends BlogPost {
  published: string;
  updated?: string;
  footnotes?: string[];
}

export interface Category {
  id: number;
  name: string;
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
}
