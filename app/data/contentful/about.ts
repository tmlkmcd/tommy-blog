import type * as contentful from "contentful";
import type { EntryCollection } from "contentful";
import type { CoreSkill, Faq, TruthAndLie } from "~/data/contentful/types";
import { contentfulClient } from "~/data/contentful/client";

export async function getSkills({
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<EntryCollection<CoreSkill>> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  const skills = (
    await client.getEntries({
      content_type: "coreSkill",
    })
  ).toPlainObject() as EntryCollection<CoreSkill>;

  skills.items.sort((a, b) => a.fields.order - b.fields.order);

  return skills;
}

export async function getTruthsAndLies({
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<EntryCollection<TruthAndLie>> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  return (
    await client.getEntries({
      content_type: "twoTruthsAndALie",
    })
  ).toPlainObject() as EntryCollection<TruthAndLie>;
}

export async function getFaqs({
  client: givenClient,
  token,
  space,
  isPreview,
}: {
  client?: contentful.ContentfulClientApi;
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): Promise<EntryCollection<Faq>> {
  const client =
    givenClient ??
    contentfulClient({
      token,
      space,
      isPreview,
    });

  return (
    await client.getEntries({
      content_type: "faq",
    })
  ).toPlainObject() as EntryCollection<Faq>;
}
