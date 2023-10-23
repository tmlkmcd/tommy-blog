import type * as contentful from "contentful";
import type { ContentfulGenericItems } from "~/rootLoader";
import type { EntryCollection } from "contentful";
import type { ImageAsset } from "~/data/contentful/types";
import { contentfulClient } from "~/data/contentful/client";
import type { Banner } from "~/data/contentful/types";
import type { Entry } from "contentful";
import type { InternalLink } from "~/data/contentful/types";
import type { Paragraph } from "~/data/contentful/types";
import { shuffleArray } from "~/data/arrayHelpers";

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
