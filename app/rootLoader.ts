import type { LoaderArgs } from "@remix-run/cloudflare";
import {
  contentfulClient,
  getBanners,
  getCategories,
  getProfilePicture,
} from "~/data/contentfulClient";
import type { ImageAsset } from "~/components/contentful/types";
import type { Banner } from "~/components/contentful/types";

export interface ContentfulGenericItems {
  categories: string[];
  displayPicture: ImageAsset | null;
  banners: Banner[];
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

  const [categories, displayPicture, banners] = await Promise.all([
    getCategories({ client, space }),
    getProfilePicture({ client, space }),
    getBanners({ client, space }),
  ]);

  return {
    categories: categories.items.map(({ fields }) => fields.name),
    displayPicture,
    banners,
  };
};
