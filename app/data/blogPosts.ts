import {
  ExtendedBlogPost,
  HeadingItem,
  isHeader,
} from "~/data/contentful/types";
import type { RichTextContent } from "contentful";
import { isFootnote } from "~/data/contentful/types";

export function crawlAndIndexFootnotes(blogPost: ExtendedBlogPost): string[] {
  let footnotes: string[] = [];

  blogPost.post.content.forEach((c) => {
    crawlContentForFootnotes(c, footnotes);
  });

  return footnotes;
}

export function crawlAndIndexHeadings(
  blogPost: ExtendedBlogPost
): HeadingItem[] {
  let headings: HeadingItem[] = [];

  blogPost.post.content.forEach((c) => {
    scanTopLevelContentForHeadings(c, headings);
  });

  return headings;
}

function crawlContentForFootnotes(
  content: RichTextContent,
  footnotes: string[]
) {
  if (isFootnote(content) && content.data.target?.sys.id) {
    footnotes.push(content.data.target?.sys.id);
  }

  if (Array.isArray(content.content) && content.content.length > 0) {
    content.content.forEach((c) => {
      crawlContentForFootnotes(c, footnotes);
    });
  }
}

function scanTopLevelContentForHeadings(
  content: RichTextContent,
  headings: HeadingItem[]
) {
  const level = isHeader(content);
  const heading = content.content?.[0]?.value;
  if (level && heading) {
    headings.push({
      level,
      heading,
    });
  }
}

export function headingToKebabCase(): undefined;
export function headingToKebabCase(heading: string): string;
export function headingToKebabCase(heading?: string) {
  if (!heading) return undefined;
  return heading
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
