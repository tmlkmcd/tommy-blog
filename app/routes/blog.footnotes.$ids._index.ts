import type { LoaderArgs } from "@remix-run/node";
import type { Footnote } from "~/components/contentful/types";
import type { EntryCollection } from "contentful";
import { getFootnotes } from "~/data/contentfulClient";

export const loader: (
  args: LoaderArgs
) => Promise<EntryCollection<Footnote>> = async ({ request, params }) => {
  const url = new URL(request.url);
  const { ids } = params;

  if (!ids) {
    throw new Error("No id provided");
  }

  return getFootnotes({
    ids,
    token: url.searchParams.get("cf_token"),
  });
};