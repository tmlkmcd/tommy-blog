import type {
  DatedBlogPost,
  RichTextFootNote,
} from "~/components/contentful/types";
import type { RichTextContent } from "contentful";

export function crawlAndIndexFootNotes(blogPost: DatedBlogPost): DatedBlogPost {
  let index = 0;

  const getNextIndex = () => {
    return ++index;
  };

  return {
    ...blogPost,
    post: {
      ...blogPost.post,
      content: blogPost.post.content.map((c) => crawlContent(c, getNextIndex)),
    },
  };
}

function crawlContent(
  content: RichTextContent,
  getNextIndex: () => number
): RichTextContent | RichTextFootNote {
  if (Array.isArray(content.content) && content.content.length > 0) {
    return {
      ...content,
      content: content.content.map((c) => crawlContent(c, getNextIndex)),
    };
  }

  if (content.nodeType !== "embedded-entry-inline") return content;

  return {
    ...content,
    index: getNextIndex(),
  };
}
