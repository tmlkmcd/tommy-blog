import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Series } from "~/components/contentful/types";
import { getSeries } from "~/data/contentfulClient";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { Layout } from "~/components/Layout";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { PostPreviewGrid } from "~/components/contentful/PostPreviewGrid";

export const loader: (
  args: LoaderArgs
) => Promise<{ series: Series; posts: ExtendedBlogPost[] }> = async ({
  context,
  request,
  params,
}) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.CONTENTFUL_SPACE as string;
  const { slug } = params;

  if (!slug) {
    throw new Error("No series provided");
  }

  return getSeries({
    slug,
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};
export default function Index() {
  const { series, posts } = useLoaderData<typeof loader>() as {
    series: Series;
    posts: ExtendedBlogPost[];
  };

  React.useEffect(() => {
    document.title = `Posts in series: '${series.name}' - Tommy's Blog`;
    return () => {
      document.title = "Tommy's Website";
    };
  }, [series.name]);

  return (
    <Layout
      title={`Posts in series: '${series.name}'`}
      subtitle={
        <LinkWithQuery
          to="/blog"
          className="text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300"
        >
          Back to all posts
        </LinkWithQuery>
      }
    >
      <PostPreviewGrid posts={posts} showSeries={false} />
    </Layout>
  );
}
