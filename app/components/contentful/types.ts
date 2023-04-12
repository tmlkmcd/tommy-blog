import type { Entry, EntryFields, RichTextContent } from "contentful";

export interface RichTextFootNote extends RichTextContent {
  index: number;
}

export interface RichTextWithFootNotes extends EntryFields.RichText {
  content: (RichTextContent | RichTextFootNote)[];
}

export function isRichTextFootNote(
  content: RichTextWithFootNotes | RichTextContent | RichTextFootNote
): content is RichTextFootNote {
  return content.nodeType === "embedded-entry-inline";
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  categories: Entry<Category>[];
  post: RichTextWithFootNotes;
}

export interface DatedBlogPost extends BlogPost {
  published: string;
  updated?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface FootNote {
  title: string;
}
