import * as React from "react";
import type {
  Asset,
  EntryFields,
  RichTextContent,
  RichTextData,
} from "contentful";
import { BlogFootnote } from "~/components/Blog/BlogFootnote";
import type { GithubGist } from "~/data/contentful/types";
import { isInternalLink, isFootnote, isGhGist } from "~/data/contentful/types";
import classNames from "classnames";
import { BlogInternalLink } from "~/components/contentful/BlogInternalLink";
import {
  BlockGithubGistDisplay,
  GithubGistError,
  TooltipGistDisplay,
} from "./GithubGist";
import { Blockquote } from "~/components/contentful/Blockquote";
import { Table } from "~/components/contentful/Table";
import { LightboxImage } from "~/components/LightboxImage";
import { headingToKebabCase } from "~/data/blogPosts";
import SyntaxHighlighter from "react-syntax-highlighter";
import a11yDark from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import { CopyIcon } from "~/icons/CopyIcon";

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

    const id =
      node.nodeType.startsWith("heading") && node.content?.[0]?.value
        ? headingToKebabCase(node.content?.[0]?.value)
        : undefined;

    return (
      <WrapRichText node={node} elementId={id}>
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
    elementId?: string;
  }>
> = ({ node, elementId, children }) => {
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

  if (isGhGist(node)) {
    const gist =
      (((node.data as RichTextData).target as any)
        ?.fields as unknown as GithubGist) ?? null;

    if (!gist || !gist.id) {
      return <GithubGistError />;
    }

    if (gist.tooltip) {
      return <TooltipGistDisplay id={gist.id} tooltip={gist.tooltip} />;
    }

    return <BlockGithubGistDisplay id={gist.id} expandable={gist.isBigCode} />;
  }

  if (nodeType === "table") {
    return <Table node={node as EntryFields.RichText} />;
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
      if (mark.some((m) => m.type === "code")) {
        if (typeof children === "string") {
          const [language, ...code] = children.split("\n");

          if (["tsx", "ts", "jsx", "js"].includes(language)) {
            const joinedCode = code.join("\n");
            const copy = () => {
              void navigator.clipboard?.writeText?.(joinedCode);
            };
            return (
              <section className="relative">
                <button
                  onClick={() => copy()}
                  className="absolute right-2 top-2 text-white"
                  type="button"
                >
                  <CopyIcon size="sm" />
                </button>
                <SyntaxHighlighter
                  language={language}
                  style={a11yDark}
                  className="rounded-lg p-2 shadow-lg"
                  customStyle={{ padding: "1rem" }}
                >
                  {joinedCode}
                </SyntaxHighlighter>
              </section>
            );
          }
        }
        return (
          <code
            className={classNames(
              className,
              "rounded bg-pinkApotheosis-300 bg-opacity-30 px-0.5"
            )}
          >
            {children}
          </code>
        );
      }
      return <span className={className}>{children}</span>;
    case "paragraph":
      return <div className={className}>{children}</div>;
    case "heading-1":
      return (
        <h1 className="text-2xl font-bold" id={elementId}>
          {children}
        </h1>
      );
    case "heading-2":
      return (
        <h2 className="mt-2 text-xl font-bold" id={elementId}>
          {children}
        </h2>
      );
    case "heading-3":
      return (
        <h3 className="mt-1 text-lg font-bold" id={elementId}>
          {children}
        </h3>
      );
    case "heading-4":
      return (
        <h4 className="font-bold" id={elementId}>
          {children}
        </h4>
      );
    case "heading-5":
      return (
        <h5 className="font-bold" id={elementId}>
          {children}
        </h5>
      );
    case "heading-6":
      return (
        <h6 className="font-bold" id={elementId}>
          {children}
        </h6>
      );
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
    case "blockquote":
      return <Blockquote>{children}</Blockquote>;
    case "embedded-asset-block":
      const img = data.target as unknown as Asset;
      return (
        <LightboxImage
          image={{
            src: img.fields.file.url,
            title: img.fields.title,
            description: img.fields.description,
          }}
          className="w-full min-w-[8rem] max-w-xs lg:max-w-sm"
          imageClassName="w-full"
        />
      );
    case "hr":
      return (
        <hr className="mx-12 my-4 border-t border-t-pasta-800 opacity-20" />
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
