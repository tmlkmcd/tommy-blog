import * as React from "react";
import type { Asset } from "contentful";
import classNames from "classnames";
import { useModal } from "~/components/Modal";
import { CrossIcon } from "~/icons/CrossIcon";

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
  const { addModal } = useModal();
  const {
    file: { url: src },
    title,
    description,
  } = image.fields;

  return (
    <div className={classNames("mx-auto flex flex-col gap-1", className)}>
      <button
        onClick={() =>
          addModal({
            element: <Lightbox src={src} alt={title} caption={description} />,
            tag: "lightbox",
          })
        }
      >
        <img
          src={src}
          alt={title}
          className={classNames(
            "mx-auto rounded lg:rounded-2xl",
            imageClassName
          )}
        />
      </button>
      <div className="text-center text-sm">{description}</div>
    </div>
  );
};

const Lightbox: React.FC<{ src: string; alt: string; caption: string }> = ({
  src,
  alt,
  caption,
}) => {
  const { popModal } = useModal();
  return (
    <div>
      <button className="float-right" onClick={() => popModal()}>
        <CrossIcon />
      </button>
      <img
        src={src}
        alt={alt}
        className={classNames(
          "mx-auto max-h-fit max-w-fit rounded lg:rounded-2xl"
        )}
      />
      <p>{caption}</p>
    </div>
  );
};
