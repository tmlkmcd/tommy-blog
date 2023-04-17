import * as React from "react";
import type { EntryCollection } from "contentful";
import type { Footnote } from "~/components/contentful/types";

interface FootnoteProvider {
  footnotes?: Record<string, Footnote & { index: number }>;
}

interface FootnoteProps {
  ids?: string;
}

const FootnoteContext = React.createContext<FootnoteProvider | null>(null);

export const Footnotes: React.FC<React.PropsWithChildren<FootnoteProps>> = ({
  ids,
  children,
}) => {
  const [footnotes, setFootnotes] = React.useState<
    FootnoteProvider["footnotes"]
  >({});

  React.useEffect(() => {
    if (!ids || ids.length === 0) {
      return;
    }

    const idsArray = ["", ...ids.split(",")];

    const getNote = async () => {
      const retrievedNote = await fetch(`/blog/footnotes/${ids}`);
      const json: EntryCollection<Footnote> = await retrievedNote.json();

      const footnotesStore: FootnoteProvider["footnotes"] = {};
      json.items.forEach((fn) => {
        footnotesStore[fn.sys.id] = {
          ...fn.fields,
          index: idsArray.indexOf(fn.sys.id),
        };
      });

      setFootnotes(footnotesStore);
    };

    getNote();
  }, [ids]);

  return (
    <FootnoteContext.Provider value={{ footnotes }}>
      {children}
    </FootnoteContext.Provider>
  );
};

export const useFootnotes = (id: string) => {
  const { footnotes } = React.useContext(FootnoteContext) || {};
  return footnotes?.[id];
};
