import * as React from "react";
import { Layout } from "~/components/Layout";
import type { Paragraph } from "~/data/contentful/types";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";
import { TuringMachine } from "app/components/VisualAndExample/TuringMachine";
import { getParagraph } from "~/data/contentful/generic";

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
    identifier: "turing-machine",
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const paragraph = useLoaderData<typeof loader>() as Paragraph;

  React.useEffect(() => {
    document.title = "Turing Machine Emulator - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  }, []);

  return (
    <Layout title="Turing Machine">
      <RichText node={paragraph.text.content[0]} />
      <TuringMachine />
    </Layout>
  );
}
