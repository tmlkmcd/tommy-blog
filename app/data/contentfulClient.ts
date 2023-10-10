import type { Entry, EntryCollection } from "contentful";
import * as contentful from "contentful";
import type {
  BlogPost,
  Category,
  ImageAsset,
  ExtendedBlogPost,
  Footnote,
  Paragraph,
  InternalLink,
  Series,
  Banner,
} from "~/components/contentful/types";
import { crawlAndIndexFootnotes } from "~/data/blogPosts";
import type { ContentfulGenericItems } from "~/rootLoader";
import type { AxiosRequestConfig } from "axios";
import { shuffleArray } from "~/data/shuffleArray";

export const contentfulClient = ({
  token,
  space,
  isPreview,
}: {
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): contentful.ContentfulClientApi => {
  if (!token || !space) {
    throw new Error("No access token and/or space provided!");
  }

  const host = isPreview ? "preview.contentful.com" : undefined;

  return contentful.createClient({
    space,
    accessToken: token,
    host,
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
  isPreview,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<ContentfulGenericItems["displayPicture"]> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const dpEntries = (
    await client.getEntries({
      content_type: "profilePicture",
      "fields.imageType": "Profile Picture",
    })
  ).toPlainObject() as EntryCollection<ImageAsset>;

  return dpEntries.items[0]?.fields ?? null;
};

export const getBanners = async ({
  token,
  client: givenClient,
  space,
  isPreview,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<Banner[]> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const dpEntries = (
    await client.getEntries({ content_type: "banner" })
  ).toPlainObject() as EntryCollection<Banner>;

  const banners = dpEntries.items.map(({ fields }) => fields);
  return shuffleArray(banners);
};

export const getPictureByTag = async ({
  token,
  client: givenClient,
  space,
  isPreview,
  tag,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
  tag: string;
}): Promise<ImageAsset> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const pictureEntries = (
    await client.getEntries({
      content_type: "profilePicture",
      "fields.imageTag": tag,
    })
  ).toPlainObject() as EntryCollection<ImageAsset>;

  return pictureEntries.items[0]?.fields ?? null;
};

export const getBlogPosts = async ({
  token,
  client: givenClient,
  space,
  isPreview,
}: {
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<ExtendedBlogPost[]> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const entries = (
    await client.getEntries({
      content_type: "blogPost",
      order: "-fields.published",
    })
  ).toPlainObject() as EntryCollection<BlogPost>;

  return entries.items.map(({ fields, sys }) => {
    return {
      ...fields,
      updated: sys.updatedAt,
    };
  });
};

export const getBlogPostsByTag = async ({
  tag,
  token,
  client: givenClient,
  space,
  isPreview,
}: {
  tag: string;
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<ExtendedBlogPost[]> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
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

export const getBlogPostsBySeries = async ({
  id,
  token,
  client: givenClient,
  space,
  isPreview,
}: {
  id: string;
  token?: string | null;
  client?: contentful.ContentfulClientApi;
  space?: string | null;
  isPreview?: boolean;
}): Promise<ExtendedBlogPost[]> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const entries = (
    await client.getEntries({
      content_type: "blogPost",
      "fields.series.sys.id": id,
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

export const getBlogPost = async ({
  slug,
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  slug: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<(ExtendedBlogPost & { footnotes: string[] }) | null> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
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

export const getInternalLink = async ({
  id,
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  id: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<Entry<InternalLink>> => {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
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
  isPreview,
}: {
  identifier: string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<Paragraph[]>;

export async function getParagraph({
  identifier,
  client,
  token,
  space,
  isPreview,
}: {
  identifier: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<Paragraph>;

export async function getParagraph({
  identifier,
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  identifier: string | string[];
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<Paragraph | Paragraph[]> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
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

export async function getSeries({
  slug,
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  slug: string;
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<{ series: Series; posts: ExtendedBlogPost[] }> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const seriesFetched = (
    await client.getEntries({
      content_type: "series",
      "fields.slug[in]": slug,
    })
  ).toPlainObject() as EntryCollection<Series>;

  const series = seriesFetched.items[0].fields;

  const seriesId = seriesFetched.items[0].sys.id;

  const posts = await getBlogPostsBySeries({
    id: seriesId,
    client,
    token,
    space,
    isPreview,
  });

  return {
    series,
    posts,
  };
}
