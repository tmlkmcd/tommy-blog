import type { LoaderArgs } from "@remix-run/node";
import type { FootNote } from "~/components/contentful/types";
import type { EntryCollection } from "contentful";
import { getFootNotes } from "~/data/contentfulClient";

export const loader: (
  args: LoaderArgs
) => Promise<EntryCollection<FootNote>> = async ({ request, params }) => {
  const url = new URL(request.url);
  const { ids } = params;

  if (!ids) {
    throw new Error("No id provided");
  }

  return getFootNotes({
    ids,
    token: url.searchParams.get("cf_token"),
  });
};
