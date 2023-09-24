import * as React from "react";
import { useRootContext } from "~/RootContext";
import { Image } from "../contentful/Image";
import { LinkWithQuery } from "~/components/LinkWithQuery";

export const SnaxBanner: React.FC = () => {
  const {
    snaxBannerPictures: [card],
  } = useRootContext();

  return (
    <article className="inset-0 flex bg-snax text-white">
      <LinkWithQuery className="inset-0 flex flex-1" to="/music">
        {card && <Image image={card.picture} />}
      </LinkWithQuery>
    </article>
  );
};
