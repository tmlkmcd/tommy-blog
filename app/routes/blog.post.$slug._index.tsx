import * as React from "react";
import { Navigate } from "react-router";
import { Layout } from "~/components/Layout";
import { type LoaderArgs } from "@remix-run/node";
import { config } from "~/config";
import type { BlogPost, DatedBlogPost } from "~/components/contentful/types";
import * as contentful from "contentful";
import type { EntryCollection } from "contentful";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";
import { crawlAndIndexFootNotes } from "~/data/blogPosts";

const {
  contentfulSpace,
  contentfulContentType,
  contentfulAccessToken,
  contentfulPreviewToken,
} = config;

export const loader: (
  args: LoaderArgs
) => Promise<DatedBlogPost | null> = async ({ request, params }) => {
  const url = new URL(request.url);

  const accessToken =
    url.searchParams.get("cf_token") ??
    contentfulAccessToken ??
    contentfulPreviewToken ??
    "";

  const client = contentful.createClient({
    space: contentfulSpace || "",
    accessToken,
  });

  const entries = (
    await client.getEntries({
      content_type: contentfulContentType || "",
      "fields.slug[in]": params.slug,
    })
  ).toPlainObject() as EntryCollection<BlogPost>;

  const post = entries.items.map(({ fields, sys }) => {
    return {
      ...fields,
      published: sys.createdAt,
      updated: sys.updatedAt,
    };
  });

  if (!post || post.length === 0) return null;

  return crawlAndIndexFootNotes(post[0]);
};

export default function Index() {
  const post = useLoaderData<typeof loader>() as DatedBlogPost | null;

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <Layout title={post.title}>
      <div className="flex flex-col gap-4">
        <RichText node={post.post} />

        <div id="footnotes" />
      </div>
    </Layout>
  );
}
