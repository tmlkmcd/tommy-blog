import * as React from "react";
import type { InternalLink } from "~/data/contentful/types";
import type { Entry } from "contentful";
import { LinkWithQuery } from "~/components/LinkWithQuery";

interface Props {
  id: string;
}

export const BlogInternalLink: React.FC<Props> = (props) => {
  const [link, setLink] = React.useState<Entry<InternalLink> | undefined>();

  React.useEffect(() => {
    const getLink = async () => {
      const retrievedLink = await fetch(`/blog/link/${props.id}`);
      const json: Entry<InternalLink> = await retrievedLink.json();
      setLink(json);
    };

    getLink();
  }, [props.id]);

  if (!link) return null;

  let to: string =
    link.fields.to ??
    `/blog/post/${link.fields.blogPostReference?.fields.slug}`;

  if (to === "/blog/post/undefined") {
    return null;
  }

  return <LinkWithQuery to={to}>{link.fields.inlineText}</LinkWithQuery>;
};
