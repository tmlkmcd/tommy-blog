import type { LoaderArgs } from "@remix-run/cloudflare";
import {
  contentfulClient,
  getPictureByTag,
  getProfilePicture,
} from "~/data/contentfulClient";
import type { ImageAsset } from "~/components/contentful/types";

export interface ContentfulGenericItems {
  displayPicture: ImageAsset | null;
  snaxBannerPictures: (ImageAsset | null)[];
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
  const snaxBannerPictures = await Promise.all([
    getPictureByTag({ client, space, tag: "snax-card" }),
  ]);

  return { displayPicture, snaxBannerPictures };
};
