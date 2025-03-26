import * as React from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { PaginationInfo, Series } from "~/data/contentful/types";
import type { ExtendedBlogPost } from "~/data/contentful/types";
import { Layout } from "~/components/Layout";
import { PostPreviewGrid } from "~/components/contentful/PostPreviewGrid";
import { useRootContext } from "~/RootContext";
import { PageName } from "~/Pages";
import { getBlogPosts } from "~/data/contentful/blog";
import { getPage } from "~/data/contentful/pagination";
import { Paginator } from "~/components/Blog/Paginator";
import { usePageNumbers } from "~/hooks/usePageNumbers";

export const loader: (args: LoaderFunctionArgs) => Promise<{
  series: Series;
  posts: ExtendedBlogPost[];
  pagination: PaginationInfo;
}> = async ({ context, request, params }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;
  const { slug } = params;

  if (!slug) {
    throw new Error("No series provided");
  }

  return getBlogPosts({
    series: slug,
    token,
    space,
    page: getPage(url.searchParams.get("page")),
    isPreview: !!url.searchParams.get("cf_token"),
  });
};
export default function Index() {
  const { series, posts, pagination } = useLoaderData<typeof loader>();

  const { pushBreadcrumb } = useRootContext();
  const { changePage } = usePageNumbers();

  React.useEffect(() => {
    pushBreadcrumb(PageName.SeriesGroup(series.name));
    document.title = `Posts in series: '${series.name}' - Tommy's Blog`;
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb, series.name]);

  return (
    <Layout title={`Posts in series: '${series.name}'`}>
      <PostPreviewGrid posts={posts} showSeries={false} />
      <Paginator {...pagination} onPageChange={changePage} />
    </Layout>
  );
}
