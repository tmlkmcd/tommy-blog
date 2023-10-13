import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { PostPreviewGrid } from "~/components/contentful/PostPreviewGrid";
import { Layout } from "~/components/Layout";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { getBlogPosts } from "~/data/contentfulClient";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { useRootContext } from "~/RootContext";
import { PageName } from "~/Pages";

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
  const { pushBreadcrumb } = useRootContext();

  React.useEffect(() => {
    pushBreadcrumb(PageName.Blog, true);
    document.title = "Tommy's Blog";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  return (
    <Layout title="Blog Posts" subtitle={<Subtitle />}>
      <section className="flex flex-col-reverse gap-2 lg:flex-row">
        <section className="flex-1">
          <PostPreviewGrid posts={posts} />
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
