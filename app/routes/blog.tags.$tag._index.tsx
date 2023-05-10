import * as React from "react";
import { Layout } from "~/components/Layout";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { useLoaderData, useParams } from "@remix-run/react";
import { PostPreview } from "~/components/contentful/PostPreview";
import { getBlogPostsByTag } from "~/data/contentfulClient";
import { LinkWithQuery } from "~/components/LinkWithQuery";

export const loader: (
  args: LoaderArgs
) => Promise<ExtendedBlogPost[]> = async ({ context, request, params }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.CONTENTFUL_SPACE as string;

  const { tag } = params;

  if (!tag) {
    throw new Error("No tag provided");
  }

  return getBlogPostsByTag({
    tag,
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
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
        <LinkWithQuery
          to="/blog"
          className="text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300"
        >
          Back to all posts
        </LinkWithQuery>
      }
    >
      {posts.map((blogPost) => (
        <PostPreview post={blogPost} key={blogPost.slug} />
      ))}
    </Layout>
  );
}
