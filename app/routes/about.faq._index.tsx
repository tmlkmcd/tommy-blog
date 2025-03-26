import * as React from "react";
import { AboutPages, PageName } from "~/Pages";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { Faq } from "~/data/contentful/types";
import { useRootContext } from "~/RootContext";
import { AccordionMenu } from "~/components/AccordionMenu";
import { contentfulClient } from "~/data/contentful/client";
import { getFaqs } from "~/data/contentful/about";

export const handle = {
  about: AboutPages.FAQ,
};

export const loader: (args: LoaderFunctionArgs) => Promise<Faq[]> = async ({
  context,
  request,
}) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;

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

  const items = faqs.map(({ question, answer }, index) => ({
    label: <div className="text-lg font-bold">{question}</div>,
    bodyText: answer,
    identifier: `faq-${index}`,
  }));

  return (
    <section>
      <AccordionMenu
        items={items}
        className="rounded border bg-white bg-opacity-20"
      />
    </section>
  );
}
