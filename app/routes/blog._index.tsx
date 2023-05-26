import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { PostPreviewGrid } from "~/components/contentful/PostPreviewGrid";
import { Layout } from "~/components/Layout";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { getBlogPosts } from "~/data/contentfulClient";

export const loader: (
  args: LoaderArgs
) => Promise<ExtendedBlogPost[]> = async ({ context, request }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.CONTENTFUL_SPACE as string;
  return getBlogPosts({
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const posts = useLoaderData<typeof loader>() as ExtendedBlogPost[];

  React.useEffect(() => {
    document.title = "Tommy's Blog";
    return () => {
      document.title = "Tommy's Website";
    };
  }, []);

  return (
    <Layout title="Blog Posts">
      <PostPreviewGrid posts={posts} />
    </Layout>
  );
}
