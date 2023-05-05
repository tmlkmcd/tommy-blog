import * as React from "react";
import { Layout } from "~/components/Layout";
import { DraggableListWithHandleGhost } from "~/components/Draggable/DraggableListWithHandleGhost";
import { DraggableList } from "~/components/Draggable/DraggableList";
import { DraggableMultipleLists } from "~/components/Draggable/DraggableMultipleLists";
import type { ListHandle } from "~/components/Draggable/DraggableBase";
import type { LoaderArgs } from "@remix-run/node";
import type { Paragraph } from "~/components/contentful/types";
import { getParagraph } from "~/data/contentfulClient";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";

export const loader: (args: LoaderArgs) => Promise<Paragraph[]> = async ({
  request,
}) => {
  const url = new URL(request.url);

  return getParagraph({
    identifier: ["draggable-list-1", "draggable-list-2", "draggable-list-3"],
    token: url.searchParams.get("cf_token"),
  });
};

export default function Index() {
  const [paragraph1, paragraph2, paragraph3] = useLoaderData<
    typeof loader
  >() as Paragraph[];

  React.useEffect(() => {
    document.title = "useDraggableField - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  }, []);

  const listRef = React.useRef<ListHandle>(null);
  const ghostListRef = React.useRef<ListHandle>(null);
  const betweenListRef = React.useRef<ListHandle>(null);

  const reset = () => {
    listRef.current?.reset();
    ghostListRef.current?.reset();
    betweenListRef.current?.reset();
  };

  return (
    <Layout title="Draggable Field Hook">
      <div className="flex flex-col gap-6 rounded border border-black border-opacity-50 bg-pinkApotheosis-400 bg-opacity-10 p-8">
        <section className="flex flex-col items-start gap-4">
          <button
            onClick={reset}
            className="rounded border border-opacity-50 bg-iceColdStare-500 bg-opacity-60 py-1 px-2 font-bold transition-colors hover:bg-opacity-80"
          >
            reset all
          </button>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Simple list</h2>
          <RichText node={paragraph1.text.content[0]} />
          <DraggableList ref={listRef} />
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">
            List - draggable handle with ghost
          </h2>
          <RichText node={paragraph2.text.content[0]} />
          <DraggableListWithHandleGhost ref={ghostListRef} />
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Moving items between lists</h2>
          <RichText node={paragraph3.text.content[0]} />
          <DraggableMultipleLists ref={betweenListRef} />
        </section>
      </div>
    </Layout>
  );
}
