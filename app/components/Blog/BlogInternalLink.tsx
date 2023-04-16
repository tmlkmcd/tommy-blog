import * as React from "react";
import type { InternalLink } from "~/components/contentful/types";
import type { Entry } from "contentful";
import { Link } from "@remix-run/react";

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

  return (
    <Link
      to={link.fields.to}
      className="text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
    >
      {link.fields.inlineText}
    </Link>
  );
};
