import * as React from "react";
import { Layout } from "~/components/Layout";
import type { LoaderArgs } from "@remix-run/node";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { PostPreview } from "~/components/contentful/PostPreview";
import { getBlogPostsByTag } from "~/data/contentfulClient";

export const loader: (
  args: LoaderArgs
) => Promise<ExtendedBlogPost[]> = async ({ request, params }) => {
  const url = new URL(request.url);
  const { tag } = params;

  if (!tag) {
    throw new Error("No tag provided");
  }

  return getBlogPostsByTag({ tag, token: url.searchParams.get("cf_token") });
};

export default function Index() {
  const posts = useLoaderData<typeof loader>() as ExtendedBlogPost[];
  const { tag } = useParams<{ tag: string }>();

  React.useEffect(() => {
    document.title = `Posts with tag: '${tag}' - Tommy's Blog`;
    return () => {
      document.title = "Tommy's Website";
    };
  }, [tag]);

  return (
    <Layout
      title={`Posts with tag: '${tag}'`}
      subtitle={
        <Link
          to="/blog"
          className="text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300"
        >
          Back to all posts
        </Link>
      }
    >
      {posts.map((blogPost) => (
        <PostPreview post={blogPost} key={blogPost.slug} />
      ))}
    </Layout>
  );
}
