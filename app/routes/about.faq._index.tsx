import * as React from "react";
import { AboutPages, PageName } from "~/Pages";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Faq } from "~/components/contentful/types";
import { contentfulClient, getFaqs } from "~/data/contentfulClient";
import { useLoaderData } from "@remix-run/react";
import { useRootContext } from "~/RootContext";

export const handle = {
  about: AboutPages.FAQ,
};

export const loader: (args: LoaderArgs) => Promise<Faq[]> = async ({
  context,
  request,
}) => {
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

  const faqs = await getFaqs({
    client,
  });

  return faqs.items.map(({ fields }) => fields);
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const faqs = useLoaderData<typeof loader>() as Faq[];

  React.useEffect(() => {
    pushBreadcrumb(PageName.About, true, true);
    pushBreadcrumb(PageName.AboutPages(handle.about));
  }, [pushBreadcrumb]);

  return <div>faq</div>;
}
