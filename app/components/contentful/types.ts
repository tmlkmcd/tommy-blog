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

export function isFootNote(
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

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  categories: Entry<Category>[];
  post: EntryFields.RichText;
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

export interface FootNote {
  title: string;
  text: EntryFields.RichText;
  index?: number;
}

export interface InternalLink {
  inlineText: string;
  name: string;
  to: string;
}

export interface Paragraph {
  identifier: string;
  text: EntryFields.RichText;
  title: string;
}
