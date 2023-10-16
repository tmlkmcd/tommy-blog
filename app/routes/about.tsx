import * as React from "react";
import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { Layout } from "~/components/Layout";
import type { Paragraph } from "~/components/contentful/types";
import { contentfulClient, getParagraph } from "~/data/contentfulClient";
import { RichText } from "~/components/contentful/RichText";
import { useRootContext } from "~/RootContext";
import { AboutPages, PageName } from "~/Pages";
import classNames from "classnames";
import { Navigate } from "react-router";

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

  const client = contentfulClient({
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });

  const paragraph = await getParagraph({
    identifier: "about-tommy",
    client,
  });
  return paragraph;
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const paragraph = useLoaderData<typeof loader>() as Paragraph;

  const matches = useMatches()
    .map<string>(({ handle }) => handle?.about)
    .filter((a) => !!a);

  React.useEffect(() => {
    document.title = "About Tommy";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  if (!matches.length) {
    return <Navigate to="/about/skills" replace={true} />;
  }

  return (
    <Layout title="About Me">
      <RichText node={paragraph.text} />
      <div className="info tabs bordered mt-4">
        <Link
          className={classNames(
            "tab p-2",
            matches.includes(AboutPages.SKILLSET) && "active"
          )}
          to="/about/skills"
        >
          Core Skills
        </Link>
        <Link
          className={classNames(
            "tab p-2",
            matches.includes(AboutPages.TTAAL) && "active"
          )}
          to="/about/ttaal"
        >
          Two Truths and a Lie
        </Link>
        <Link
          className={classNames(
            "tab p-2",
            matches.includes(AboutPages.FAQ) && "active"
          )}
          to="/about/faq"
        >
          FAQ
        </Link>
      </div>
      <div className="p-2">
        <Outlet />
      </div>
    </Layout>
  );
}
