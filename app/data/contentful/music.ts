import type * as contentful from "contentful";
import type { Band } from "~/data/contentful/types";
import type { EntryCollection } from "contentful";
import { contentfulClient } from "~/data/contentful/client";

export async function getBands({
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<Band[]> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const seriesFetched = (
    await client.getEntries({
      content_type: "bands",
    })
  ).toPlainObject() as EntryCollection<Band>;

  const bands = seriesFetched.items.map(({ fields }) => fields);
  bands.sort((a, b) => a.order - b.order);

  return bands;
}
