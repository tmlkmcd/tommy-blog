import { useOutletContext } from "react-router";
import type { Band } from "~/data/contentful/types";
import * as React from "react";
import { PageName } from "~/Pages";
import { useRootContext } from "~/RootContext";
import { ImageGallery } from "~/components/ImageGallery";
import { RichText } from "~/components/contentful/RichText";

export default function Index() {
  const band = useOutletContext() as Band;
  const { pushBreadcrumb } = useRootContext();

  React.useEffect(() => {
    pushBreadcrumb(PageName.Music, true, true);
    pushBreadcrumb(band.name, false, true);
  }, [band.name, pushBreadcrumb]);

  const { name, colourHex, fontColourHex, description, gallery, mainLink } =
    band;

  const images = gallery.map(({ fields }) => ({
    src: fields.file.url,
    title: fields.title,
    description: fields.description,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex justify-start">
          <a
            href={mainLink}
            className="rounded-lg p-2 text-2xl font-bold"
            style={{
              backgroundColor: colourHex,
              color: fontColourHex,
            }}
          >
            {name}
          </a>
        </div>
        <RichText node={description} />
      </div>
      <ImageGallery images={images} />
    </div>
  );
}
