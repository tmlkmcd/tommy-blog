import * as React from "react";
import type { EntryCollection } from "contentful";
import type { FootNote } from "~/components/contentful/types";

interface FootNoteProvider {
  footnotes?: Record<string, FootNote & { index: number }>;
}

interface FootNoteProps {
  ids?: string;
}

const FootNoteContext = React.createContext<FootNoteProvider | null>(null);

export const FootNotes: React.FC<React.PropsWithChildren<FootNoteProps>> = ({
  ids,
  children,
}) => {
  const [footnotes, setFootnotes] = React.useState<
    FootNoteProvider["footnotes"]
  >({});

  React.useEffect(() => {
    if (!ids || ids.length === 0) {
      return;
    }

    const idsArray = ["", ...ids.split(",")];

    const getNote = async () => {
      const retrievedNote = await fetch(`/blog/footnotes/${ids}`);
      const json: EntryCollection<FootNote> = await retrievedNote.json();

      const footnotesStore: FootNoteProvider["footnotes"] = {};
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
    <FootNoteContext.Provider value={{ footnotes }}>
      {children}
    </FootNoteContext.Provider>
  );
};

export const useFootnotes = (id: string) => {
  const { footnotes } = React.useContext(FootNoteContext) || {};
  return footnotes?.[id];
};
