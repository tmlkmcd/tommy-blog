import * as React from "react";
import { LightboxImage } from "~/components/LightboxImage";

interface Image {
  src: string;
  title: string;
  description: string;
}

interface Props {
  images: Image[];
}

export const ImageGallery: React.FC<Props> = ({ images }) => {
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3">
      {images.map((image) => {
        return (
          <>
            <div key={image.title} className="relative aspect-[3/2] w-full">
              <LightboxImage
                image={image}
                className="z-10 overflow-hidden"
                aspect="3/2"
              />
            </div>
            <div className="border-b border-dashed opacity-80 md:hidden [&:last-child]:hidden" />
          </>
        );
      })}
    </div>
  );
};
