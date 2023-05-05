import type { Entry, EntryCollection } from "contentful";
import * as contentful from "contentful";
import { config } from "~/config";
import type {
  BlogPost,
  Category,
  DisplayPicture,
  ExtendedBlogPost,
  Footnote,
  Paragraph,
  InternalLink,
} from "~/components/contentful/types";
import { crawlAndIndexFootnotes } from "~/data/blogPosts";
import type { ContentfulGenericItems } from "~/rootLoader";

const {
  contentfulSpace,
  contentfulContentTypeBlog,
  contentfulContentTypeCategory,
  contentfulContentTypeDisplayPic,
  contentfulAccessToken,
  contentfulPreviewToken,
} = config;

export const contentfulClient = ({
  token,
}: {
  token?: string | null;
}): contentful.ContentfulClientApi => {
  const accessToken = token ?? contentfulAccessToken ?? contentfulPreviewToken;

  if (!accessToken) {
    throw new Error("No access token provided!");
  }

  return contentful.createClient({
    space: contentfulSpace || "",
    accessToken,
  });
};

export const getProfilePicture = async ({
  token,
  client: givenClient,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
}): Promise<ContentfulGenericItems["displayPicture"]> => {
  const client = givenClient ?? contentfulClient({ token });

  const dpEntries = (
    await client.getEntries({
      content_type: contentfulContentTypeDisplayPic || "",
    })
  ).toPlainObject() as EntryCollection<DisplayPicture>;

  return dpEntries.items[0]
    ? {
        href: dpEntries.items[0].fields.picture.fields.file.url,
        caption: dpEntries.items[0].fields.caption,
      }
    : null;
};

export const getBlogPosts = async ({
  token,
  client: givenClient,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
}): Promise<ExtendedBlogPost[]> => {
  const client = givenClient ?? contentfulClient({ token });

  const entries = (
    await client.getEntries({
      content_type: contentfulContentTypeBlog || "",
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

export const getBlogPostsByTag = async ({
  tag,
  token,
  client: givenClient,
}: {
  tag: string;
  token?: string | null;
  client?: contentful.ContentfulClientApi;
}): Promise<ExtendedBlogPost[]> => {
  const client = givenClient ?? contentfulClient({ token });
  const categories = await getCategories({ token, client });

  const { id } = categories.items.filter(
    ({ fields }) => fields.name.toLowerCase() === tag.toLowerCase()
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

export const getBlogPost = async ({
  slug,
  client: givenClient,
  token,
}: {
  slug: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
}): Promise<(ExtendedBlogPost & { footnotes: string[] }) | null> => {
  const client = givenClient ?? contentfulClient({ token });

  const entries = (
    await client.getEntries({
      content_type: contentfulContentTypeBlog || "",
      "fields.slug[in]": slug,
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

  const footnotes = crawlAndIndexFootnotes(post[0]);

  return {
    ...post[0],
    footnotes,
  };
};

export const getCategories = async ({
  client: givenClient,
  token,
}: {
  client?: contentful.ContentfulClientApi;
  token?: string | null;
}): Promise<EntryCollection<Category>> => {
  const client = givenClient ?? contentfulClient({ token });

  return (
    await client.getEntries({
      content_type: contentfulContentTypeCategory || "",
    })
  ).toPlainObject() as EntryCollection<Category>;
};

export const getFootnotes = async ({
  ids,
  client: givenClient,
  token,
}: {
  ids: string | string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
}): Promise<EntryCollection<Footnote>> => {
  const client = givenClient ?? contentfulClient({ token });
  return (
    await client.getEntries({
      content_type: "footnote",
      "sys.id[in]": Array.isArray(ids) ? ids.join(",") : ids,
    })
  ).toPlainObject() as EntryCollection<Footnote>;
};

export const getInternalLink = async ({
  id,
  client: givenClient,
  token,
}: {
  id: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
}): Promise<Entry<InternalLink>> => {
  const client = givenClient ?? contentfulClient({ token });

  return (
    await client.getEntry(id, {
      content_type: "internalLink",
    })
  ).toPlainObject() as Entry<InternalLink>;
};

export async function getParagraph({
  identifier,
  client,
  token,
}: {
  identifier: string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
}): Promise<Paragraph[]>;

export async function getParagraph({
  identifier,
  client,
  token,
}: {
  identifier: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
}): Promise<Paragraph>;

export async function getParagraph({
  identifier,
  client: givenClient,
  token,
}: {
  identifier: string | string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
}): Promise<Paragraph | Paragraph[]> {
  const client = givenClient ?? contentfulClient({ token });

  const paragraphs = (
    await client.getEntries({
      content_type: "paragraphs",
      "fields.identifier[in]": Array.isArray(identifier)
        ? identifier.join(",")
        : identifier,
      order: "fields.identifier",
    })
  ).toPlainObject() as EntryCollection<Paragraph>;

  return Array.isArray(identifier)
    ? paragraphs.items.map((p) => p.fields)
    : paragraphs.items[0].fields;
}
