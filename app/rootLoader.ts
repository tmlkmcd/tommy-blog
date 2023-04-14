import type { LoaderArgs } from "@remix-run/node";
import type { DisplayPicture } from "~/components/contentful/types";
import * as contentful from "contentful";
import type { EntryCollection } from "contentful";
import { config } from "~/config";

const {
  contentfulSpace,
  contentfulContentTypeDisplayPic,
  contentfulAccessToken,
  contentfulPreviewToken,
} = config;

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

  const accessToken =
    url.searchParams.get("cf_token") ??
    contentfulAccessToken ??
    contentfulPreviewToken ??
    "";

  const client = contentful.createClient({
    space: contentfulSpace || "",
    accessToken,
  });

  const dpEntries = (
    await client.getEntries({
      content_type: contentfulContentTypeDisplayPic || "",
    })
  ).toPlainObject() as EntryCollection<DisplayPicture>;

  return {
    displayPicture: dpEntries.items[0]
      ? {
          href: dpEntries.items[0].fields.picture.fields.file.url,
          caption: dpEntries.items[0].fields.caption,
        }
      : null,
  };
};
