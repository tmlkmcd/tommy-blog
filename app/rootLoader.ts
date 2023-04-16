import type { LoaderArgs } from "@remix-run/node";
import { contentfulClient, getProfilePicture } from "~/data/contentfulClient";

export interface ContentfulGenericItems {
  displayPicture: null | {
    caption: string;
    href: string;
  };
}

export const loader: (
  args: LoaderArgs
) => Promise<ContentfulGenericItems | null> = async ({ request }) => {
  const url = new URL(request.url);
  const client = contentfulClient({
    token: url.searchParams.get("cf_token"),
  });

  const displayPicture = await getProfilePicture({ client });

  return { displayPicture };
};
