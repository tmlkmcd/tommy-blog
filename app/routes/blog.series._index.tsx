import * as React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Series } from "~/components/contentful/types";
import { getAllSeries } from "~/data/contentfulClient";
import { useRootContext } from "~/RootContext";
import { useLoaderData } from "@remix-run/react";
import { PageName } from "~/Pages";
import { Layout } from "~/components/Layout";
import { GeneralPreviewGrid } from "~/components/contentful/PostPreviewGrid";

export const loader: (args: LoaderArgs) => Promise<Series[]> = async ({
  context,
  request,
}) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.CONTENTFUL_SPACE as string;

  return getAllSeries({
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const series = useLoaderData<typeof loader>() as Series[];

  React.useEffect(() => {
    pushBreadcrumb(PageName.Series);
    document.title = "Blog Series - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  const items = series.map(
    ({ name, slug, image, numberOfPosts, description }) => {
      return {
        title: name,
        blurb: description,
        imgSrc: image?.fields.file.url ?? null,
        id: slug,
        target: `/blog/series/${slug}`,
      };
    }
  );

  return (
    <Layout
      title="Blog Series"
      subtitle={<div>Blog posts grouped by series</div>}
    >
      <GeneralPreviewGrid items={items} />
    </Layout>
  );
}
