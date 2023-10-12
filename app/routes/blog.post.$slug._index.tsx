import * as React from "react";
import { Navigate } from "react-router";
import { Layout } from "~/components/Layout";
import { type LoaderArgs } from "@remix-run/cloudflare";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";
import { Categories } from "~/components/contentful/Categories";
import { getBlogPost } from "~/data/contentfulClient";
import { Footnotes } from "~/components/Blog/FootnoteProvider";
import { useRootContext } from "~/RootContext";
import { PageName } from "~/Pages";

export const loader: (
  args: LoaderArgs
) => Promise<ExtendedBlogPost | null> = async ({
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

  if (!params.slug) {
    throw new Error('Missing "slug" parameter');
  }

  return getBlogPost({
    slug: params.slug,
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const post = useLoaderData<typeof loader>() as ExtendedBlogPost | null;

  React.useEffect(() => {
    pushBreadcrumb(PageName.Post(post?.title));
    if (post) document.title = `${post.title} - Tommy's Blog`;
    return () => {
      document.title = "Tommy's Website";
    };
  }, [post, pushBreadcrumb]);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <Footnotes ids={post.footnotes?.join(",")}>
      <Layout
        title={post.title}
        subtitle={
          <Categories
            categories={post.categories}
            published={post.published}
            updated={post.updated}
          />
        }
      >
        <div className="flex flex-col gap-4">
          <RichText node={post.post} />
          <div id="footnotes" />
        </div>
      </Layout>
    </Footnotes>
  );
}
