import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import * as contentful from "contentful";
import type { EntryCollection } from "contentful";

import type { BlogPost } from "~/components/contentful/types";
import { PostPreview } from "~/components/contentful/PostPreview";
import { config } from "~/config";
import { Layout } from "~/components/Layout";
import type { DatedBlogPost } from "~/components/contentful/types";

const {
  contentfulSpace,
  contentfulContentType,
  contentfulAccessToken,
  contentfulPreviewToken,
} = config;

export const loader: (args: LoaderArgs) => Promise<DatedBlogPost[]> = async ({
  request,
}) => {
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
      order: "-sys.createdAt",
    })
  ).toPlainObject() as EntryCollection<BlogPost>;

  return entries.items.map(({ fields, sys }) => {
    return {
      ...fields,
      published: sys.createdAt,
      updated: sys.updatedAt,
    };
  });
};

export default function Index() {
  const posts = useLoaderData<typeof loader>() as DatedBlogPost[];

  return (
    <Layout title="Blog Posts">
      {posts.map((blogPost) => (
        <PostPreview post={blogPost} key={blogPost.slug} />
      ))}
    </Layout>
  );
}
