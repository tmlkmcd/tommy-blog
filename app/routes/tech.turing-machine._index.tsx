import * as React from "react";
import { Layout } from "~/components/Layout";
import type { Paragraph } from "~/components/contentful/types";
import { getParagraph } from "~/data/contentfulClient";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";
import { TuringMachine } from "~/components/TuringMachine";

export const loader: (args: LoaderArgs) => Promise<Paragraph> = async ({
  request,
}) => {
  const url = new URL(request.url);
  return getParagraph({
    identifier: "turing-machine",
    token: url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const paragraph = useLoaderData<typeof loader>() as Paragraph;

  React.useEffect(() => {
    document.title = "Turing Machine Emulator - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  });

  return (
    <Layout title="Turing Machine">
      <RichText node={paragraph.text.content[0]} />
      <TuringMachine />
    </Layout>
  );
}
