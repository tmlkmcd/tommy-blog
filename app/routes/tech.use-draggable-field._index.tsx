import * as React from "react";
import { Layout } from "~/components/Layout";
import { DraggableListWithHandleGhost } from "~/components/Draggable/DraggableListWithHandleGhost";
import { DraggableList } from "~/components/Draggable/DraggableList";
import { DraggableMultipleLists } from "~/components/Draggable/DraggableMultipleLists";
import type { LoaderArgs } from "@remix-run/node";
import type { Paragraph } from "~/components/contentful/types";
import { getParagraph } from "~/data/contentfulClient";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "~/components/contentful/RichText";
import { useDraggableField } from "~/hooks/useDraggableField";
import { rearrangeArray } from "~/data/rearrangeArray";
import classNames from "classnames";

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
    console.log(
      "Did you notice that the title of each section is draggable on the page too? 😬"
    );
    return () => {
      document.title = "Tommy's Website";
    };
  }, []);

  const [sections, setSections] = React.useState<
    {
      title: string;
      desc: React.ReactElement;
      body: React.ReactElement;
    }[]
  >(() => [
    {
      title: "Simple list",
      desc: <RichText node={paragraph1.text.content[0]} />,
      body: <DraggableList />,
    },
    {
      title: "List - draggable handle with ghost",
      desc: <RichText node={paragraph2.text.content[0]} />,
      body: <DraggableListWithHandleGhost />,
    },
    {
      title: "Moving items between lists",
      desc: <RichText node={paragraph3.text.content[0]} />,
      body: <DraggableMultipleLists />,
    },
  ]);

  const { dragging, dragOver, draggableItemProps, dropZoneProps } =
    useDraggableField({
      fieldName: "sections",
      onRearrange: (fromIndex: number, toIndex: number) => {
        setSections((currentSections) => {
          return rearrangeArray(currentSections, fromIndex, toIndex);
        });
      },
    });

  return (
    <Layout title="Draggable Field Hook">
      <div className="flex flex-col gap-6 rounded border border-black border-opacity-50 bg-pinkApotheosis-400 bg-opacity-10 p-8">
        {sections.map(({ title, desc, body }, i) => (
          <section
            className={classNames(
              "flex flex-col gap-2 p-2",
              dragging === i && "opacity-50",
              dragOver === i && "rounded border border-dashed"
            )}
            {...dropZoneProps(i)}
            key={title}
          >
            <div
              className="flex flex-row gap-2"
              {...draggableItemProps(i, {
                ghost: <div className="p-4">😬</div>,
              })}
            >
              <h2 className="text-xl font-bold">{title}</h2>
            </div>

            {desc}
            {body}
          </section>
        ))}
      </div>
    </Layout>
  );
}
