import type { LoaderFunctionArgs } from "react-router";
import type { Category, ImageAsset } from "~/data/contentful/types";
import type { Banner } from "~/data/contentful/types";
import { contentfulClient } from "~/data/contentful/client";
import { getCategories } from "~/data/contentful/blog";
import { getBanners, getProfilePicture } from "~/data/contentful/generic";

export interface ContentfulGenericItems {
  categories: Category[];
  displayPicture: ImageAsset | null;
  banners: Banner[];
}

export const loader: (
  args: LoaderFunctionArgs,
) => Promise<ContentfulGenericItems | null> = async ({ context, request }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;

  console.log("context", context);

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
    categories: categories.items.map(({ fields }) => fields),
    displayPicture,
    banners,
  };
};
