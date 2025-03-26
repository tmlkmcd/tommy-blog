import type { LoaderFunctionArgs } from "react-router";
import type { InternalLink } from "~/data/contentful/types";
import type { Entry } from "contentful";
import { getInternalLink } from "~/data/contentful/generic";

export const loader: (
  args: LoaderFunctionArgs,
) => Promise<Entry<InternalLink>> = async ({ context, request, params }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;

  const { id } = params;

  if (!id) {
    throw new Error("No id provided");
  }

  return getInternalLink({
    id,
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};
