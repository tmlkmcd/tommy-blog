import * as React from "react";
import {
  Outlet,
  useLoaderData,
  useMatches,
  type LoaderFunctionArgs,
} from "react-router";
import { Layout } from "~/components/Layout";
import type { Paragraph } from "~/data/contentful/types";
import { RichText } from "~/components/contentful/RichText";
import { AboutPages } from "~/Pages";
import classNames from "classnames";
import { Navigate, useNavigate } from "react-router";
import { contentfulClient } from "~/data/contentful/client";
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

  const client = contentfulClient({
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });

  return getParagraph({
    identifier: "about-tommy",
    client,
  });
};

export default function Index() {
  const paragraph = useLoaderData<typeof loader>() as Paragraph;
  const navigate = useNavigate();

  const matches = useMatches()
    .map<string>(({ handle }) => handle?.about)
    .filter((a) => !!a);

  React.useEffect(() => {
    document.title = "About Tommy";
    return () => {
      document.title = "Tommy's Website";
    };
  }, []);

  if (!matches.length) {
    return <Navigate to="/about/skills" replace={true} />;
  }

  const transition = (to: string) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(to));
      return;
    }

    navigate(to);
  };

  return (
    <Layout title="😬 About Me">
      <RichText node={paragraph.text} />
      <div className="info tabs bordered mt-4">
        <button
          className={classNames(
            "tab p-2",
            matches.includes(AboutPages.SKILLSET) && "active",
          )}
          onClick={() => transition("/about/skills")}
        >
          Expertise
        </button>
        <button
          className={classNames(
            "tab p-2",
            matches.includes(AboutPages.TTAAL) && "active",
          )}
          onClick={() => transition("/about/ttaal")}
        >
          Two Truths and a Lie
        </button>
        <button
          className={classNames(
            "tab p-2",
            matches.includes(AboutPages.FAQ) && "active",
          )}
          onClick={() => transition("/about/faq")}
        >
          FAQ
        </button>
      </div>
      <div className="p-2">
        <Outlet />
      </div>
    </Layout>
  );
}
