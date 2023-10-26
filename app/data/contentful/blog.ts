import type * as contentful from "contentful";
import type { BlogPost, ExtendedBlogPost } from "~/data/contentful/types";
import type { EntryCollection } from "contentful";
import type { Category, Series } from "~/data/contentful/types";
import { contentfulClient } from "~/data/contentful/client";
import type { Footnote } from "~/data/contentful/types";
import { crawlAndIndexFootnotes } from "~/data/blogPosts";

export async function getBlogPosts({
  token,
  client,
  space,
  isPreview,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<ExtendedBlogPost[]>;

export async function getBlogPosts({
  slug,
  token,
  client,
  space,
  isPreview,
}: {
  slug: string;
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<ExtendedBlogPost>;

export async function getBlogPosts({
  tag,
  token,
  client,
  space,
  isPreview,
}: {
  tag: string;
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<ExtendedBlogPost[]>;

export async function getBlogPosts({
  series,
  token,
  client,
  space,
  isPreview,
}: {
  series: string;
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<{ series: Series; posts: ExtendedBlogPost[] }>;

export async function getBlogPosts({
  slug,
  tag,
  series,
  token,
  client: givenClient,
  space,
  isPreview,
}: {
  slug?: string;
  tag?: string;
  series?: string;
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<
  | ExtendedBlogPost
  | ExtendedBlogPost[]
  | { series: Series; posts: ExtendedBlogPost[] }
> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  let categoryId: string | null = null;
  let seriesId: string | null = null;
  let seriesData: Series | null = null;

  if (tag) {
    const categories = await getCategories({ token, client });

    const { id } = categories.items.filter(
      ({ fields }) => fields.name.toLowerCase() === tag.toLowerCase()
    )[0].sys;

    categoryId = id;
  } else if (series) {
    const seriesFetched = (
      await client.getEntries({
        content_type: "series",
        "fields.slug[in]": series,
      })
    ).toPlainObject() as EntryCollection<Series>;

    seriesData = seriesFetched.items[0].fields;
    seriesId = seriesFetched.items[0].sys.id;
  }

  const options: Record<string, string> = {
    content_type: "blogPost",
    order: "-fields.published",
  };

  if (slug) {
    options["fields.slug[in]"] = slug;
  } else if (categoryId) {
    options["fields.categories.sys.id"] = categoryId;
  } else if (seriesData && seriesId) {
    options["fields.series.sys.id"] = seriesId;
  }

  const entries = (
    await client.getEntries(options)
  ).toPlainObject() as EntryCollection<BlogPost>;

  if (slug) {
    const post = entries.items[0];
    return {
      ...post.fields,
      footnotes: crawlAndIndexFootnotes(post.fields),
      updated: post.sys.updatedAt,
    };
  } else if (seriesData && seriesId) {
    return {
      series: seriesData,
      posts: entries.items.map(({ fields, sys }) => {
        return {
          ...fields,
          updated: sys.updatedAt,
        };
      }),
    };
  }

  return entries.items.map(({ fields, sys }) => {
    return {
      ...fields,
      updated: sys.updatedAt,
    };
  });
}

export async function getAllSeries({
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<Series[]> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const allSeriesFetched = (
    await client.getEntries({
      content_type: "series",
    })
  ).toPlainObject() as EntryCollection<Series>;

  return allSeriesFetched.items.map(({ fields }) => fields);
}

export const getCategories = async ({
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<EntryCollection<Category>> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  return (
    await client.getEntries({ content_type: "categori" })
  ).toPlainObject() as EntryCollection<Category>;
};

export const getFootnotes = async ({
  ids,
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  ids: string | string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<EntryCollection<Footnote>> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });
  return (
    await client.getEntries({
      content_type: "footnote",
      "sys.id[in]": Array.isArray(ids) ? ids.join(",") : ids,
    })
  ).toPlainObject() as EntryCollection<Footnote>;
};
