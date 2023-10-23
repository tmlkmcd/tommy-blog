import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Footnote } from "~/data/contentful/types";
import type { EntryCollection } from "contentful";
import { getFootnotes } from "~/data/contentful/blog";

export const loader: (
  args: LoaderArgs
) => Promise<EntryCollection<Footnote>> = async ({
  context,
  request,
  params,
}) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.CONTENTFUL_SPACE as string;

  const { ids } = params;

  if (!ids) {
    throw new Error("No id provided");
  }

  return getFootnotes({
    ids,
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};
