import * as React from "react";
import classNames from "classnames";
import { useModal } from "~/components/Modal";
import { CrossIcon } from "~/icons/CrossIcon";

interface Props {
  image: {
    src: string;
    title: string;
    description: string;
  };
  className?: string;
  imageClassName?: string;
  aspect?: "3/2" | "16/9" | "1/1";
}

export const LightboxImage: React.FC<Props> = ({
  image,
  className,
  imageClassName,
  aspect,
}) => {
  const { addModal } = useModal();
  const { src, title, description } = image;

  return (
    <div className={classNames("mx-auto flex flex-col gap-1", className)}>
      <button
        className={classNames(
          "relative overflow-hidden rounded",
          aspect === "3/2" && "aspect-[3/2]",
          aspect === "16/9" && "aspect-[16/9]",
          aspect === "1/1" && "aspect-[1/1]"
        )}
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
          className={classNames("mx-auto", imageClassName)}
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
    <div className="max-h-[100%] max-w-[100%]">
      <div
        className={classNames(
          "max-h-[inherit] max-w-[inherit] overflow-hidden",
          "md:max-h-[85vh] lg:max-h-[70vh]"
        )}
      >
        <img
          src={src}
          alt={alt}
          className="box-border max-h-[inherit] max-w-[inherit] rounded border-4 border-white object-contain"
        />
      </div>
      <p className="flex justify-between text-white opacity-80">
        <span>{caption}</span>
        <button className="float-right" onClick={() => popModal()}>
          <CrossIcon size="sm" />
        </button>
      </p>
    </div>
  );
};
