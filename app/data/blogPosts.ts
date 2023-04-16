import type { ExtendedBlogPost } from "~/components/contentful/types";
import type { RichTextContent } from "contentful";
import { isFootNote } from "~/components/contentful/types";

export function crawlAndIndexFootNotes(blogPost: ExtendedBlogPost): string[] {
  let footnotes: string[] = [];

  blogPost.post.content.forEach((c) => {
    crawlContent(c, footnotes);
  });

  return footnotes;
}

function crawlContent(content: RichTextContent, footnotes: string[]) {
  if (isFootNote(content) && content.data.target?.sys.id) {
    footnotes.push(content.data.target?.sys.id);
  }

  if (Array.isArray(content.content) && content.content.length > 0) {
    content.content.forEach((c) => {
      crawlContent(c, footnotes);
    });
  }
}
