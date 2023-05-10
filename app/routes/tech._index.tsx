import * as React from "react";

import { Layout } from "~/components/Layout";
import { LinkedinIcon } from "~/icons/LinkedinIcon";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Paragraph } from "~/components/contentful/types";
import { getParagraph } from "~/data/contentfulClient";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";

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
    identifier: "technology-overview",
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const paragraph = useLoaderData<typeof loader>() as Paragraph;

  React.useEffect(() => {
    document.title = "Technology - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  }, []);

  return (
    <Layout title="Technology" subtitle={<Subtitle />}>
      <div className="flex flex-col gap-4">
        <RichText node={paragraph.text} />
      </div>
    </Layout>
  );
}

const Subtitle: React.FC = () => {
  return (
    <a
      href="https://www.linkedin.com/in/tmlkmcd/"
      className="flex items-center justify-start gap-2 text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
    >
      <LinkedinIcon /> Currently working at Tractable, London UK
    </a>
  );
};
