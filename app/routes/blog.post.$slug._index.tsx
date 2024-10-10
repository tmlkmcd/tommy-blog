import * as React from "react";
import { Navigate } from "react-router";
import { Layout } from "~/components/Layout";
import { type LoaderArgs } from "@remix-run/cloudflare";
import type { ExtendedBlogPost } from "~/data/contentful/types";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";
import { Categories } from "~/components/contentful/Categories";
import { Footnotes } from "~/components/Blog/FootnoteProvider";
import { useRootContext } from "~/RootContext";
import { PageName } from "~/Pages";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { getBlogPosts } from "~/data/contentful/blog";
import { YouTubeVideo } from "~/components/Blog/YouTubeVideo";

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

  return getBlogPosts({
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
            categories={post.categories.map(({ fields: { name } }) => name)}
            published={post.published}
            updated={post.updated}
          />
        }
      >
        <div className="flex flex-col gap-4">
          <RichText node={post.post} />
          <p>-tommy</p>
          {post.youtubeVideoId && (
            <YouTubeVideo videoId={post.youtubeVideoId} />
          )}
          <SignOff />
          {(post.footnotes || []).length > 0 && (
            <>
              <div className="mt-2 text-xl font-bold">Footnotes</div>
              <div id="footnotes" />
            </>
          )}
        </div>
      </Layout>
    </Footnotes>
  );
}

function SignOff() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm italic">
        Thanks for reading! If you enjoyed reading this post and/or learned
        something, please{" "}
        <LinkWithQuery to="/contact">get in touch</LinkWithQuery> and let me
        know. Better yet, if you've found any errata in my blog posts, please do{" "}
        <LinkWithQuery to="/contact">make me aware</LinkWithQuery>. I'm always
        looking for opportunities to improve my writing!
      </p>
    </div>
  );
}
