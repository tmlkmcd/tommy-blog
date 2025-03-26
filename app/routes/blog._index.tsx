import * as React from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { PostPreviewGrid } from "~/components/contentful/PostPreviewGrid";
import { Layout } from "~/components/Layout";
import type { ExtendedBlogPost, PaginationInfo } from "~/data/contentful/types";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { useRootContext } from "~/RootContext";
import { PageName } from "~/Pages";
import { getBlogPosts } from "~/data/contentful/blog";
import { getPage } from "~/data/contentful/pagination";
import { Paginator } from "~/components/Blog/Paginator";
import { usePageNumbers } from "~/hooks/usePageNumbers";

export const loader: (args: LoaderFunctionArgs) => Promise<{
  posts: ExtendedBlogPost[];
  pagination: PaginationInfo;
}> = async ({ context, request }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;
  return getBlogPosts({
    token,
    space,
    page: getPage(url.searchParams.get("page")),
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const { posts, pagination } = useLoaderData<typeof loader>();
  const { pushBreadcrumb } = useRootContext();
  const { changePage } = usePageNumbers();

  React.useEffect(() => {
    pushBreadcrumb(PageName.Blog, true);
    document.title = "Tommy's Blog";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  return (
    <Layout title="📖 Blog Posts" subtitle={<Subtitle />}>
      <section className="flex flex-col-reverse gap-2 lg:flex-row">
        <section className="flex-1">
          <PostPreviewGrid posts={posts} />
          <Paginator {...pagination} onPageChange={changePage} />
        </section>
      </section>
    </Layout>
  );
}

const Subtitle: React.FC = () => {
  return (
    <span className="text-sm">
      You can also browse by <LinkWithQuery to="/blog/tags">tag</LinkWithQuery>{" "}
      or by <LinkWithQuery to="/blog/series">series</LinkWithQuery>.
    </span>
  );
};
