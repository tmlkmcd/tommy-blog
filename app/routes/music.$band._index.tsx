import { useOutletContext } from "react-router";
import type { Band } from "~/components/contentful/types";
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

  const { description, gallery, mainLink } = band;

  const images = gallery.map(({ fields }) => ({
    src: fields.file.url,
    title: fields.title,
    description: fields.description,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex flex-col gap-4">
        <RichText node={description} />
      </div>
      <ul className="list-disc">
        <li>
          <a
            href={mainLink}
            className="ml-2 text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
          >
            Main page (external)
          </a>
        </li>
      </ul>
      <ImageGallery images={images} />
    </div>
  );
}
