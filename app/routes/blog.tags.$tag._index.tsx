import * as React from "react";
import * as contentful from "contentful";
import { Layout } from "~/components/Layout";
import type { LoaderArgs } from "@remix-run/node";
import { config } from "~/config";
import type {
  BlogPost,
  Category,
  DatedBlogPost,
} from "~/components/contentful/types";
import type { EntryCollection } from "contentful";
import { useLoaderData, useParams } from "@remix-run/react";
import { PostPreview } from "~/components/contentful/PostPreview";

const {
  contentfulSpace,
  contentfulContentTypeBlog,
  contentfulContentTypeCategory,
  contentfulAccessToken,
  contentfulPreviewToken,
} = config;

interface Props {}

export const loader: (args: LoaderArgs) => Promise<DatedBlogPost[]> = async ({
  request,
  params,
}) => {
  const url = new URL(request.url);
  const { tag } = params;

  const accessToken =
    url.searchParams.get("cf_token") ??
    contentfulAccessToken ??
    contentfulPreviewToken ??
    "";

  const client = contentful.createClient({
    space: contentfulSpace || "",
    accessToken,
  });

  const categories = (
    await client.getEntries({
      content_type: contentfulContentTypeCategory || "",
    })
  ).toPlainObject() as EntryCollection<Category>;

  const { id } = categories.items.filter(
    ({ fields }) => fields.name.toLowerCase() === tag?.toLowerCase()
  )[0].sys;

  const entries = (
    await client.getEntries({
      content_type: contentfulContentTypeBlog || "",
      "fields.categories.sys.id": id,
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
  const { tag } = useParams<{ tag: string }>();

  React.useEffect(() => {
    document.title = `Posts with tag: '${tag}' - Tommy's Blog`;
    return () => {
      document.title = "Tommy's Website";
    };
  });

  return (
    <Layout title={`Posts with tag: '${tag}'`}>
      {posts.map((blogPost) => (
        <PostPreview post={blogPost} key={blogPost.slug} />
      ))}
    </Layout>
  );
}
