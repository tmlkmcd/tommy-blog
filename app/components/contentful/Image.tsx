import * as React from "react";
import type { Asset } from "contentful";
import classNames from "classnames";

interface Props {
  image: Asset;
  className?: string;
}

export const Image: React.FC<Props> = ({ image, className }) => {
  const {
    file: { url: src },
    title,
  } = image.fields;

  return (
    <img
      src={src}
      alt={title}
      className={classNames("mx-auto rounded lg:rounded-2xl", className)}
    />
  );
};
