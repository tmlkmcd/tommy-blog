import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { Layout } from "~/components/Layout";
import type { Paragraph, TruthAndLie } from "~/components/contentful/types";
import {
  contentfulClient,
  getParagraph,
  getTruthsAndLies,
} from "~/data/contentfulClient";
import { RichText } from "~/components/contentful/RichText";
import { shuffleArray } from "~/data/shuffleArray";
import { TwoTruthsAndALie } from "~/components/contentful/TwoTruthsAndALie";

export const loader: (
  args: LoaderArgs
) => Promise<{ paragraph: Paragraph; ttaal: TruthAndLie[] }> = async ({
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

  const [paragraph, truthsAndLies] = await Promise.all([
    getParagraph({
      identifier: "music-about",
      client,
    }),
    getTruthsAndLies({
      client,
    }),
  ]);

  let items = [...truthsAndLies.items];
  items = shuffleArray(items);

  let truths = items.filter((t) => t.fields.isReal === true);
  let lies = items.filter((t) => t.fields.isReal === false);

  items = shuffleArray([...truths.slice(0, 2), lies[0]]);

  return {
    paragraph,
    ttaal: items.map(({ fields }) => fields),
  };
};

export default function Index() {
  const { paragraph, ttaal } = useLoaderData<typeof loader>() as {
    paragraph: Paragraph;
    ttaal: TruthAndLie[];
  };

  React.useEffect(() => {
    document.title = "About Tommy";
    return () => {
      document.title = "Tommy's Website";
    };
  });

  return (
    <Layout title="About Me">
      <RichText node={paragraph.text} />
      <TwoTruthsAndALie truthsAndLies={ttaal} />
    </Layout>
  );
}

function Faq() {
  return <div>faq</div>;
}
