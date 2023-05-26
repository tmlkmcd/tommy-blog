import * as React from "react";
import type { EntryFields } from "contentful";
import { RichText } from "~/components/contentful/RichText";

interface Props {
  node: EntryFields.RichText;
}

export const Table: React.FC<Props> = ({ node }) => {
  const [header, ...rows] = node.content;
  return (
    <article className="flex content-stretch p-4">
      <div className="flex-1 overflow-x-scroll">
        <table className="border-b-2 border-sapphireSplendour-700">
          <thead className="rounded-t-lg bg-sapphireSplendour-700">
            <tr>
              {(header.content || []).map(({ content = [] }, i) => {
                return content[0] ? (
                  <th
                    key={i}
                    className="p-2 text-white first:rounded-tl-lg last:rounded-tr-lg"
                  >
                    <RichText node={content[0]} />
                  </th>
                ) : null;
              })}
            </tr>
          </thead>
          <tbody className="shadow-casual">
            {rows.map((row, i) => {
              return (
                <tr
                  key={i}
                  className=" border-b border-b-iceColdStare-600 last:border-none odd:bg-lightMint-100/50 even:bg-lightMint-100/30"
                >
                  {(row.content || []).map(({ content = [] }, j) => (
                    <td key={j} className="px-2">
                      <div className="max-w-[12rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
                        <RichText node={content[0]} />
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </article>
  );
};
