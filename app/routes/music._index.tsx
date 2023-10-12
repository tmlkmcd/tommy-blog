import * as React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Paragraph } from "~/components/contentful/types";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { RichText } from "~/components/contentful/RichText";
import { getParagraph } from "~/data/contentfulClient";
import { useRootContext } from "~/RootContext";
import { PageName } from "~/Pages";

export const loader: (args: LoaderArgs) => Promise<Paragraph> = async ({
  context,
  request,
}) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.CONTENTFUL_SPACE as string;

  return getParagraph({
    identifier: "music-about",
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const paragraph = useLoaderData<typeof loader>() as Paragraph;
  const { pushBreadcrumb } = useRootContext();

  React.useEffect(() => {
    pushBreadcrumb(PageName.Music, true);
    document.title = "Music - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  return (
    <Layout title="🎵 Music 🎹">
      <div className="flex flex-col gap-4">
        <RichText node={paragraph.text} />
      </div>
    </Layout>
  );
}
