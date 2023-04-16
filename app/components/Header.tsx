import * as React from "react";

import { HeaderLink } from "~/components/HeaderLink";
import classNames from "classnames";
import { useRootContext } from "~/RootContext";

export const Header: React.FC = () => {
  const { displayPicture } = useRootContext();

  return (
    <header className="flex border-b bg-pinkApotheosis-50 bg-opacity-60 px-4 pt-4 shadow-lg">
      <div className="hidden md:block">
        <div
          className={classNames(
            "flex translate-y-2/4 rounded-full border",
            "overflow-hidden bg-white bg-cover bg-contain bg-fixed bg-center bg-no-repeat",
            "md:h-40 md:w-40 lg:h-64 lg:w-64"
          )}
        >
          {displayPictureHasLoaded(displayPicture) ? (
            <img
              src={displayPicture.href}
              alt={displayPicture.caption}
              className="object-contain"
            />
          ) : (
            <span className="mx-auto my-auto px-4">
              <div className="text-xl">Oops!</div>
              <div className="text-md">
                Looks like this display picture is too attractive for your
                screen.{" "}
                <span className="text-sm italic">
                  But seriously, the image failed to load. That's on us. We're
                  working on it!
                </span>
              </div>
            </span>
          )}
        </div>
      </div>
      <div className="flex grow flex-col">
        <div className="grow">content</div>
        <div className="flex flex-col md:flex-row md:justify-evenly">
          <HeaderLink label="Blog" path="/blog" />
          <HeaderLink label="Music" path="/music" />
          <HeaderLink label="Technology" path="/tech" />
          <HeaderLink label="About" path="/about" />
          <HeaderLink label="Contact" path="/contact" />
        </div>
      </div>
    </header>
  );
};

function displayPictureHasLoaded(
  displayPicture: {
    caption: string;
    href: string;
  } | null
): displayPicture is {
  caption: string;
  href: string;
} {
  return displayPicture !== null;
}
