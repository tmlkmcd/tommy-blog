import * as React from "react";
import type { EntryFields } from "contentful";
import { RichText } from "~/components/contentful/RichText";

interface Props {
  node: EntryFields.RichText;
}

export const Table: React.FC<Props> = ({ node }) => {
  const [header, ...rows] = node.content;
  return (
    <div className="w-full overflow-x-scroll rounded-t-lg">
      <table className="w-full rounded-t-lg border-b-2 border-b-sapphireSplendour-700">
        <thead className="bg-sapphireSplendour-700">
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
        <tbody className="">
          {rows.map((row, i) => {
            return (
              <tr
                key={i}
                className="border-b border-b-iceColdStare-600 last:border-none odd:bg-lightMint-100/50 even:bg-lightMint-100/30"
              >
                {(row.content || []).map(({ content = [] }, j) => (
                  <td key={j} className="p-2 px-2">
                    <RichText node={content[0]} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
