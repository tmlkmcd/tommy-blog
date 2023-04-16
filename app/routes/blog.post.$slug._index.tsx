import * as React from "react";
import { Navigate } from "react-router";
import { Layout } from "~/components/Layout";
import { type LoaderArgs } from "@remix-run/node";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";
import { Categories } from "~/components/contentful/Categories";
import { formatBlogDate, getTime } from "~/data/dates";
import { getBlogPost } from "~/data/contentfulClient";
import { FootNotes } from "~/components/Blog/FootNoteProvider";

export const loader: (
  args: LoaderArgs
) => Promise<ExtendedBlogPost | null> = async ({ request, params }) => {
  const url = new URL(request.url);

  if (!params.slug) {
    throw new Error('Missing "slug" parameter');
  }

  return getBlogPost({
    slug: params.slug,
    token: url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const post = useLoaderData<typeof loader>() as ExtendedBlogPost | null;

  React.useEffect(() => {
    if (post) document.title = `${post.title} - Tommy's Blog`;
    return () => {
      document.title = "Tommy's Website";
    };
  });

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <FootNotes ids={post.footnotes?.join(",")}>
      <Layout
        title={post.title}
        subtitle={
          <Categories
            categories={post.categories}
            leadingText={
              <span>
                <span className="font-bold text-iceColdStare-800">
                  {formatBlogDate(post.published)} @ {getTime(post.published)}
                </span>{" "}
                in{" "}
              </span>
            }
          />
        }
      >
        <div className="flex flex-col gap-4">
          <RichText node={post.post} />
          {post.updated && <LastUpdatedIndicator lastUpdated={post.updated} />}
          <div id="footnotes" />
        </div>
      </Layout>
    </FootNotes>
  );
}

const LastUpdatedIndicator: React.FC<{ lastUpdated: string }> = ({
  lastUpdated,
}) => {
  return (
    <span className="font-bold italic text-iceColdStare-800">
      last updated: {getTime(lastUpdated)}
    </span>
  );
};
