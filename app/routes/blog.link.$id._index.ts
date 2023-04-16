import type { LoaderArgs } from "@remix-run/node";
import type { InternalLink } from "~/components/contentful/types";
import type { Entry } from "contentful";
import { getInternalLink } from "~/data/contentfulClient";

export const loader: (
  args: LoaderArgs
) => Promise<Entry<InternalLink>> = async ({ request, params }) => {
  const url = new URL(request.url);
  const { id } = params;

  if (!id) {
    throw new Error("No id provided");
  }

  return getInternalLink({
    id,
    token: url.searchParams.get("cf_token"),
  });
};
