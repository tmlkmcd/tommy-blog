import * as React from "react";
import type { EntryFields, RichTextContent, RichTextData } from "contentful";
import { BlogFootnote } from "~/components/Blog/BlogFootnote";
import { isInternalLink, isFootnote } from "~/components/contentful/types";
import classNames from "classnames";
import { Image } from "~/components/contentful/Image";
import { BlogInternalLink } from "~/components/Blog/BlogInternalLink";

interface Props {
  node: EntryFields.RichText | RichTextContent;
}

export const RichText: React.FC<Props> = ({ node }) => {
  if (node.content && node.content.length > 0) {
    if (isRichTextDocument(node)) {
      return (
        <>
          {node.content.map((innerNode, i) => (
            <RichText key={i} node={innerNode} />
          ))}
        </>
      );
    }

    return (
      <WrapRichText node={node}>
        {node.content.map((innerNode, i) => (
          <RichText key={i} node={innerNode} />
        ))}
      </WrapRichText>
    );
  }

  const { value } = node as RichTextContent;

  return <WrapRichText node={node}>{value}</WrapRichText>;
};

const WrapRichText: React.FC<
  React.PropsWithChildren<{
    node: EntryFields.RichText | RichTextContent;
  }>
> = ({ node, children }) => {
  const { nodeType, data } = node;

  if (isFootnote(node)) {
    const id = (node.data as RichTextData).target?.sys.id;
    if (!id) return null;

    return <BlogFootnote id={id} />;
  }

  if (isInternalLink(node)) {
    const id = (node.data as RichTextData).target?.sys.id;
    if (!id) return null;

    return <BlogInternalLink id={id} />;
  }

  const mark = (node as RichTextContent).marks || [];

  const isBold = mark.some((m) => m.type === "bold");
  const isItalic = mark.some((m) => m.type === "italic");
  const isUnderline = mark.some((m) => m.type === "underline");

  const className = classNames(
    isBold && "font-bold",
    isItalic && "italic",
    isUnderline && "underline"
  );

  switch (nodeType) {
    case "text":
      return <span className={className}>{children}</span>;
    case "paragraph":
      return <p className={className}>{children}</p>;
    case "heading-1":
      return <h1 className="text-xxl font-bold">{children}</h1>;
    case "heading-2":
      return <h2 className="mt-2 text-xl font-bold">{children}</h2>;
    case "heading-3":
      return <h3 className="mt-1 text-lg font-bold">{children}</h3>;
    case "heading-4":
      return <h4 className="font-bold">{children}</h4>;
    case "heading-5":
      return <h5 className="font-bold">{children}</h5>;
    case "heading-6":
      return <h6 className="font-bold">{children}</h6>;
    case "hyperlink":
      return (
        <a
          href={data.uri}
          className="text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
        >
          {children}
        </a>
      );
    case "unordered-list":
      return <ul className="ml-6 list-disc">{children}</ul>;
    case "ordered-list":
      return <ol className="ml-6 list-decimal">{children}</ol>;
    case "list-item":
      return <li className="">{children}</li>;
    case "embedded-asset-block":
      return (
        <Image
          image={data.target as any}
          className="w-full min-w-[8rem] max-w-xs lg:max-w-sm"
          imageClassName="w-full"
        />
      );
    default:
      console.log("not implemented", node, nodeType);
      return <React.Fragment />;
  }
};

function isRichTextDocument(
  node: EntryFields.RichText | RichTextContent
): node is EntryFields.RichText {
  return (node as RichTextContent).nodeType === "document";
}
