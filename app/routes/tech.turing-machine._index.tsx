import * as React from "react";
import { Layout } from "~/components/Layout";
import type { Paragraph } from "~/data/contentful/types";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { RichText } from "~/components/contentful/RichText";
import { TuringMachine } from "../components/VisualAndExample/TuringMachine";
import { getParagraph } from "~/data/contentful/generic";

export const loader: (args: LoaderFunctionArgs) => Promise<Paragraph> = async ({
  context,
  request,
}) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;

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
