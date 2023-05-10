import type { LoaderArgs } from "@remix-run/cloudflare";
import type { InternalLink } from "~/components/contentful/types";
import type { Entry } from "contentful";
import { getInternalLink } from "~/data/contentfulClient";

export const loader: (
  args: LoaderArgs
) => Promise<Entry<InternalLink>> = async ({ context, request, params }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.CONTENTFUL_SPACE as string;

  const { id } = params;

  if (!id) {
    throw new Error("No id provided");
  }

  return getInternalLink({
    id,
    token,
    space,
  });
};
