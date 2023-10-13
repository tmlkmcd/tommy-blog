import * as React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Series } from "~/components/contentful/types";
import { getAllSeries } from "~/data/contentfulClient";
import { useRootContext } from "~/RootContext";
import { useLoaderData } from "@remix-run/react";
import { PageName } from "~/Pages";
import { Layout } from "~/components/Layout";

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
    pushBreadcrumb(PageName.Series, true);
    document.title = "Blog Series - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  return <Layout title="Blog Series"></Layout>;
}
