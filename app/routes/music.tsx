import * as React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Band, Paragraph } from "~/components/contentful/types";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { RichText } from "~/components/contentful/RichText";
import {
  contentfulClient,
  getBands,
  getParagraph,
} from "~/data/contentfulClient";
import { Navigate, useNavigate } from "react-router";
import classNames from "classnames";

export const loader: (
  args: LoaderArgs
) => Promise<{ paragraph: Paragraph; bands: Band[] }> = async ({
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

  const [paragraph, bands] = await Promise.all([
    getParagraph({
      client,
      identifier: "music-about",
    }),
    getBands({
      client,
    }),
  ]);

  return {
    paragraph,
    bands,
  };
};

export default function Index() {
  const { paragraph, bands } = useLoaderData<typeof loader>() as {
    paragraph: Paragraph;
    bands: Band[];
  };
  const navigate = useNavigate();

  const bandRoutes = bands.map((band) => {
    return `${band.name.toLowerCase()}`;
  });

  const showingBandIndex = bandRoutes.indexOf(useParams().band ?? "");

  if (showingBandIndex === -1) {
    return <Navigate to={`/music/${bandRoutes[0]}`} replace={true} />;
  }

  const transition = (to: string) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(to));
      return;
    }

    navigate(to);
  };

  return (
    <Layout title="🎸 Music" subtitle={<Subtitle />}>
      <RichText node={paragraph.text} />
      <div className="warn tabs bordered mt-4">
        {bands.map((band, index) => {
          return (
            <button
              className={classNames(
                "tab p-2",
                index === showingBandIndex && "active"
              )}
              onClick={() => transition(`/music/${band.name.toLowerCase()}`)}
              key={band.name}
            >
              {band.name}
            </button>
          );
        })}
      </div>

      <Outlet context={bands[showingBandIndex]} />
    </Layout>
  );
}

function Subtitle() {
  return (
    <div className="flex justify-start gap-2 text-sm">
      <span className="rounded bg-white bg-opacity-30 px-2 opacity-80">
        🎹 Grade 8 (Associated Board),
      </span>
      <span className="rounded bg-white bg-opacity-30 px-2 opacity-80">
        🎻 Grade 5 (Associated Board)
      </span>
    </div>
  );
}
