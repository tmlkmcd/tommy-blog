import type { LoaderArgs } from "@remix-run/cloudflare";
import { contentfulClient, getProfilePicture } from "~/data/contentfulClient";

export interface ContentfulGenericItems {
  displayPicture: null | {
    caption: string;
    href: string;
  };
}

export const loader: (
  args: LoaderArgs
) => Promise<ContentfulGenericItems | null> = async ({ context, request }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.CONTENTFUL_SPACE as string;

  const client = contentfulClient({
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });

  const displayPicture = await getProfilePicture({ client, space });

  return { displayPicture };
};
