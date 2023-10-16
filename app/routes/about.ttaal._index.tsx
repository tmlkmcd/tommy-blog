import * as React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { TruthAndLie } from "~/components/contentful/types";
import { contentfulClient, getTruthsAndLies } from "~/data/contentfulClient";
import { shuffleArray } from "~/data/shuffleArray";
import { useLoaderData } from "@remix-run/react";
import { useCascadeAnimate } from "~/hooks/useCascadeAnimate";
import classNames from "classnames";
import { AboutPages, PageName } from "~/Pages";
import { useRootContext } from "~/RootContext";

export const handle = {
  about: AboutPages.TTAAL,
};

export const loader: (args: LoaderArgs) => Promise<TruthAndLie[]> = async ({
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

  const truthsAndLies = await getTruthsAndLies({
    client,
  });

  let items = [...truthsAndLies.items];
  items = shuffleArray(items);

  let truths = items.filter((t) => t.fields.isReal);
  let lies = items.filter((t) => !t.fields.isReal);

  items = shuffleArray([...truths.slice(0, 2), lies[0]]);

  return items.map(({ fields }) => fields);
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const truthsAndLies = useLoaderData<typeof loader>() as TruthAndLie[];
  const { animating } = useCascadeAnimate({ limit: 3 });

  React.useEffect(() => {
    pushBreadcrumb(PageName.About, true, true);
    pushBreadcrumb(PageName.AboutPages(handle.about));
  }, [pushBreadcrumb]);

  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-col items-stretch gap-6 pt-2 md:flex-row">
        {truthsAndLies.map((truthAndLie, i) => (
          <Item
            key={truthAndLie.detail}
            truthAndLie={truthAndLie}
            fadeIn={animating > i}
          />
        ))}
      </section>
    </section>
  );
}

function Item({
  truthAndLie,
  fadeIn,
}: {
  truthAndLie: TruthAndLie;
  fadeIn: boolean;
}) {
  // flip card credit: https://www.smashingmagazine.com/2020/02/magic-flip-cards-common-sizing-problem/
  return (
    <button
      className={classNames(
        fadeIn
          ? "animate-slide-in-side-fancy"
          : "invisible translate-y-[1.5rem]",
        "flex flex-1 items-stretch rounded-xl bg-transparent transition",
        "flipCard-wrapper"
      )}
    >
      <div className="flipCard-inner-wrapper">
        <p className="flex items-center justify-center rounded-xl bg-pasta-200 p-4 text-lg opacity-80 shadow-casual">
          <span>{truthAndLie.detail}</span>
        </p>
        <p
          className={classNames(
            "flex flex-col items-center justify-center gap-4 rounded-xl p-4 opacity-80 shadow-casual",
            truthAndLie.isReal ? "bg-lightMint-500" : "bg-danger-400"
          )}
        >
          <span className="text-xl font-bold">
            {truthAndLie.isReal ? "True" : "False"}!
          </span>
          <span>{truthAndLie.explanation}</span>
        </p>
      </div>
    </button>
  );
}
