import * as React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Paragraph } from "~/data/contentful/types";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { RichText } from "~/components/contentful/RichText";
import { ImplementedECSimulators } from "~/components/VisualAndExample/ErrorCorrection/types";
import classNames from "classnames";
import { HammingCode } from "~/components/VisualAndExample/ErrorCorrection/HammingCode/HammingCode";
import { ChevronIcon } from "~/icons/Chevron";
import { HammingProvider } from "~/components/VisualAndExample/ErrorCorrection/HammingCode/HammingContext";
import { getParagraph } from "~/data/contentful/generic";

const ImplementedSimulatorsMap: Record<
  ImplementedECSimulators,
  {
    title: string;
    bits?: [number, number];
  }
> = {
  [ImplementedECSimulators.HAMMING_CODE]: {
    title: "Hamming Code",
    bits: [7, 4],
  },
};

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
    identifier: "error-correction",
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const paragraph = useLoaderData<typeof loader>() as Paragraph;

  React.useEffect(() => {
    /* Dear reader 👋
     * I'm not sure about you, but I really didn't
     * like having my tab start with the word
     * 'Error'. So we title it this way around 🤷‍ */
    document.title = "Correction of Errors - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  }, []);

  const [simulator, setSimulator] = React.useState<ImplementedECSimulators>(
    ImplementedECSimulators.HAMMING_CODE
  );

  const [isEncoding, setIsEncoding] = React.useState<boolean>(true);

  return (
    <Layout title="Error Correction">
      <section className="flex flex-col gap-4">
        <RichText node={paragraph.text} />
      </section>
      <section
        className={classNames(
          "flex flex-col gap-6 border border-black border-opacity-60 p-2 sm:p-6",
          "overflow-hidden bg-white sm:shadow-[inset_0_0_0.75rem_rgba(0,_0,_0,_0.6)]"
        )}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:flex-row-reverse sm:gap-2">
            <span className="flex items-center gap-2 text-iceColdStare-700">
              <ChevronIcon
                direction="left"
                size="sm"
                className="hidden sm:block"
              />
              <ChevronIcon direction="down" size="sm" className="sm:hidden" />
              algorithm
            </span>
            <select
              onChange={(ev) =>
                setSimulator(ev.target.value as ImplementedECSimulators)
              }
              className="info select ghost min-w-[10rem]"
            >
              {Object.entries(ImplementedSimulatorsMap).map(
                ([key, { title }]) => (
                  <option key={key} value={key}>
                    {title}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="flex flex-col items-center gap-1 sm:flex-row-reverse sm:gap-2">
            <input
              checked={!isEncoding}
              type="checkbox"
              className="info switch"
              onChange={(ev) => setIsEncoding(!ev.target.checked)}
            />
            <span className="flex items-center gap-2 text-iceColdStare-700">
              <ChevronIcon direction="up" size="sm" className="sm:hidden" />
              {isEncoding ? "encoding 🔊" : "decoding 🦻"}
              <ChevronIcon
                direction="right"
                size="sm"
                className="hidden sm:block"
              />
            </span>
          </div>
        </div>
        <div className="info divider mx-4" />
        <Simulator simulator={simulator} isEncoding={isEncoding} />
      </section>
    </Layout>
  );
}

const Simulator: React.FC<{
  simulator: ImplementedECSimulators;
  isEncoding: boolean;
}> = ({ simulator, isEncoding }) => {
  switch (simulator) {
    case ImplementedECSimulators.HAMMING_CODE:
      return (
        <HammingProvider isEncoding={isEncoding}>
          <HammingCode />
        </HammingProvider>
      );
  }

  return null;
};
