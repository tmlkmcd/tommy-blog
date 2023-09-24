import * as React from "react";
import { useRootContext } from "~/RootContext";
import { Image } from "../contentful/Image";
import { LinkWithQuery } from "~/components/LinkWithQuery";

export const SljoBanner: React.FC = () => {
  const {
    sljoBannerPictures: [logo],
  } = useRootContext();

  return (
    <article className="inset-0 flex bg-black text-white">
      <LinkWithQuery className="inset-0 flex flex-1" to="/music">
        {logo && <Image image={logo.picture} />}
      </LinkWithQuery>
    </article>
  );
};
