import type { Entry, EntryCollection } from "contentful";
import * as contentful from "contentful";
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
import type { AxiosRequestConfig } from "axios";

export const contentfulClient = ({
  token,
  space,
}: {
  token?: string | null;
  space?: string | null;
}): contentful.ContentfulClientApi => {
  if (!token || !space) {
    throw new Error("No access token and/or space provided!");
  }

  return contentful.createClient({
    space,
    accessToken: token,
    adapter: async (config: AxiosRequestConfig) => {
      const url = new URL(`${config.baseURL}/${config.url}`);
      if (config.params) {
        for (const key of Object.keys(config.params)) {
          url.searchParams.append(key, config.params[key]);
        }
      }

      const request = new Request(url.href, {
        method: config.method ? config.method.toUpperCase() : "GET",
        body: config.data,
        redirect: "manual",
        headers: config.headers
          ? (config.headers as Record<string, string>)
          : {},
      });

      const response = await fetch(request);

      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: config,
        request: request,
      };
    },
  });
};

export const getProfilePicture = async ({
  token,
  client: givenClient,
  space,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
}): Promise<ContentfulGenericItems["displayPicture"]> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
    });

  const dpEntries = (
    await client.getEntries({ content_type: "profilePicture" })
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
  space,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
}): Promise<ExtendedBlogPost[]> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
    });

  const entries = (
    await client.getEntries({
      content_type: "blogPost",
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
  space,
}: {
  tag: string;
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
}): Promise<ExtendedBlogPost[]> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
    });
  const categories = await getCategories({ token, client });

  const { id } = categories.items.filter(
    ({ fields }) => fields.name.toLowerCase() === tag.toLowerCase()
  )[0].sys;

  const entries = (
    await client.getEntries({
      content_type: "blogPost",
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
  space,
}: {
  slug: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
}): Promise<(ExtendedBlogPost & { footnotes: string[] }) | null> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
    });

  const entries = (
    await client.getEntries({
      content_type: "blogPost",
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
  space,
}: {
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
}): Promise<EntryCollection<Category>> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
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
}: {
  ids: string | string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
}): Promise<EntryCollection<Footnote>> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
    });
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
  space,
}: {
  id: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
}): Promise<Entry<InternalLink>> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
    });

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
  space,
}: {
  identifier: string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
}): Promise<Paragraph[]>;

export async function getParagraph({
  identifier,
  client,
  token,
  space,
}: {
  identifier: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
}): Promise<Paragraph>;

export async function getParagraph({
  identifier,
  client: givenClient,
  token,
  space,
}: {
  identifier: string | string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
}): Promise<Paragraph | Paragraph[]> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
    });

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
