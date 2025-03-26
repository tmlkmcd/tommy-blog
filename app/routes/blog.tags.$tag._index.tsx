import * as React from "react";
import { Layout } from "~/components/Layout";
import type { ExtendedBlogPost, PaginationInfo } from "~/data/contentful/types";
import {
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
} from "react-router";
import { PostPreviewGrid } from "~/components/contentful/PostPreviewGrid";
import { useRootContext } from "~/RootContext";
import { PageName } from "~/Pages";
import { getBlogPosts } from "~/data/contentful/blog";
import { getPage } from "~/data/contentful/pagination";
import { Paginator } from "~/components/Blog/Paginator";
import { usePageNumbers } from "~/hooks/usePageNumbers";

export const loader: (args: LoaderFunctionArgs) => Promise<{
  posts: ExtendedBlogPost[];
  pagination: PaginationInfo;
}> = async ({ context, request, params }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;

  const { tag } = params;

  if (!tag) {
    throw new Error("No tag provided");
  }

  return getBlogPosts({
    tag,
    token,
    space,
    page: getPage(url.searchParams.get("page")),
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const { posts, pagination } = useLoaderData<typeof loader>() as {
    posts: ExtendedBlogPost[];
    pagination: PaginationInfo;
  };
  const { tag } = useParams<{ tag: string }>();
  const { changePage } = usePageNumbers();

  React.useEffect(() => {
    pushBreadcrumb(PageName.Tag(tag));
    document.title = `Posts with tag: '${tag}' - Tommy's Blog`;
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb, tag]);

  return (
    <Layout title={`Posts with tag: '${tag}'`}>
      <PostPreviewGrid posts={posts} />
      <Paginator {...pagination} onPageChange={changePage} />
    </Layout>
  );
}
