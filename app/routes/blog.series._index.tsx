import * as React from "react";
import type { Series } from "~/data/contentful/types";
import { useRootContext } from "~/RootContext";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { PageName } from "~/Pages";
import { Layout } from "~/components/Layout";
import { GeneralPreviewGrid } from "~/components/contentful/PostPreviewGrid";
import { getAllSeries } from "~/data/contentful/blog";

export const loader: (args: LoaderFunctionArgs) => Promise<Series[]> = async ({
  context,
  request,
}) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;

  return getAllSeries({
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const series = useLoaderData<typeof loader>();

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
    },
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
