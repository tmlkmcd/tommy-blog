import * as React from "react";
import type { Asset } from "contentful";
import classNames from "classnames";

interface Props {
  image: Asset;
  className?: string;
  imageClassName?: string;
}

export const Image: React.FC<Props> = ({
  image,
  className,
  imageClassName,
}) => {
  return (
    <div className={classNames("mx-auto flex flex-col gap-1", className)}>
      <img
        src={image.fields.file.url}
        alt={image.fields.title}
        className={classNames("mx-auto rounded lg:rounded-2xl", imageClassName)}
      />
      <div className="text-center text-sm">{image.fields.description}</div>
    </div>
  );
};
