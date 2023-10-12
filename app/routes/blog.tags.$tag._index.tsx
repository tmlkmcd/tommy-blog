import * as React from "react";
import { Layout } from "~/components/Layout";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { useLoaderData, useParams } from "@remix-run/react";
import { PostPreviewGrid } from "~/components/contentful/PostPreviewGrid";
import { getBlogPostsByTag } from "~/data/contentfulClient";
import { useRootContext } from "~/RootContext";
import { PageName } from "~/Pages";

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
  const { pushBreadcrumb } = useRootContext();
  const posts = useLoaderData<typeof loader>() as ExtendedBlogPost[];
  const { tag } = useParams<{ tag: string }>();

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
    </Layout>
  );
}
