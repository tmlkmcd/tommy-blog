import * as React from "react";
import { AboutPages, PageName } from "~/Pages";
import type { CoreSkill } from "~/components/contentful/types";
import { contentfulClient, getSkills } from "~/data/contentfulClient";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { useRootContext } from "~/RootContext";

export const handle = {
  about: AboutPages.SKILLSET,
};

export const loader: (args: LoaderArgs) => Promise<CoreSkill[]> = async ({
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

  const skills = await getSkills({
    client,
  });

  return skills.items.map(({ fields }) => fields);
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const skills = useLoaderData<typeof loader>() as CoreSkill[];

  React.useEffect(() => {
    pushBreadcrumb(PageName.About, true, true);
    pushBreadcrumb(PageName.AboutPages(handle.about));
  }, [pushBreadcrumb]);

  return <div>skillset</div>;
}
