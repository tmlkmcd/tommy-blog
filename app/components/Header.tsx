import * as React from "react";

import { HeaderLink } from "~/components/HeaderLink";
import classNames from "classnames";
import { useRootContext } from "~/RootContext";
import { Banner } from "~/components/Banner";
import type { ImageAsset } from "~/components/contentful/types";
import { Image } from "~/components/contentful/Image";

export const Header: React.FC = () => {
  const { displayPicture } = useRootContext();

  return (
    <header className="flex flex-col border-b bg-pinkApotheosis-50 bg-opacity-60 shadow-lg">
      <Banner />
      <div className="flex px-4 md:-mt-12 md:pt-4 lg:-mt-24">
        <div className="hidden md:block md:h-20 md:w-40 lg:h-32 lg:w-64">
          <div
            className={classNames(
              "flex rounded-full border",
              "overflow-hidden bg-white bg-cover bg-fixed bg-center bg-no-repeat",
              "md:h-40 md:w-40 lg:h-64 lg:w-64"
            )}
          >
            {displayPictureHasLoaded(displayPicture) ? (
              <Image
                image={displayPicture?.picture}
                className="z-50 object-contain"
              />
            ) : (
              <span className="z-50 mx-auto my-auto flex flex-col gap-2 px-4">
                <div className="text-xl font-bold">Oops!</div>
                <div className="text-md">
                  Looks like this display picture is too attractive for your
                  screen.&nbsp;
                  <span className="text-sm italic">
                    But seriously, the image failed to load. That's on me. I'm
                    working on it!
                  </span>
                </div>
              </span>
            )}
          </div>
        </div>
        <div className="flex grow flex-col justify-end">
          <div className="flex flex-col md:flex-row md:justify-evenly">
            <HeaderLink label="Blog" path="/blog" />
            <HeaderLink label="Music" path="/music" />
            <HeaderLink label="Technology" path="/tech" />
            <HeaderLink label="About" path="/about" />
            <HeaderLink label="Contact" path="/contact" />
          </div>
        </div>
      </div>
    </header>
  );
};

function displayPictureHasLoaded(
  displayPicture: ImageAsset | null
): displayPicture is ImageAsset {
  return displayPicture !== null;
}
