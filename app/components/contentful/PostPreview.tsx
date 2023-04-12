import * as React from "react";
import type { DatedBlogPost } from "~/components/contentful/types";
import { Link } from "@remix-run/react";
import type { EntryFields, RichTextContent } from "contentful";
import { formatBlogDate } from "~/data/dates";

interface Props {
  post: DatedBlogPost;
}

export const PostPreview: React.FC<Props> = React.memo(function PostPreview({
  post,
}) {
  return (
    <section className="flex pb-4">
      <div className="flex grow flex-col gap-2 rounded p-2">
        <header className="mx-1 border-b border-dashed border-iceColdStare-900 pb-1">
          {formatBlogDate(post.published)}
        </header>
        <Link to={`/blog/post/${post.slug}`} className="text-xl lg:text-2xl">
          {post.title}
        </Link>
        <section>
          {post.categories.map(({ fields: category }, i) => {
            return (
              <React.Fragment key={category.name}>
                {i ? ", " : ""}
                <Link
                  to={`/blog/tags/${category.name}`}
                  key={category.id}
                  className="text-sm text-iceColdStare-900 underline"
                >
                  {category.name}
                </Link>
              </React.Fragment>
            );
          })}
        </section>
        <span>
          <TextPreview body={post.post} />{" "}
          <Link to={`/blog/post/${post.slug}`}>(read more)</Link>
        </span>
      </div>
    </section>
  );
});

const TextPreview: React.FC<{ body: EntryFields.RichText }> = ({ body }) => {
  const {
    content: [content],
  } = body;

  const preview = slicePreviewBetweenWords(content);
  if (!preview) return null;

  return <span>{preview} ... </span>;
};

function slicePreviewBetweenWords(
  content: RichTextContent,
  index: number = 120
): string | null {
  let value = content.value;
  while (!value) {
    if (content.content) {
      value = content.content[0].value;
    } else {
      console.warn("weird payload", content);
      return null;
    }
  }

  const nextSpace = value.indexOf(" ", index);
  if (nextSpace === -1) {
    return value;
  }
  return value.slice(0, nextSpace);
}
