import * as React from "react";

import { HeaderLink } from "~/components/HeaderLink";
import classNames from "classnames";

export const Header: React.FC = () => {
  return (
    <header className="flex border-b bg-pinkApotheosis-50 bg-opacity-60 px-4 pt-4 shadow-lg">
      <div className="hidden md:block">
        <div
          className={classNames(
            "translate-y-2/4 rounded-full border",
            "bg-portrait bg-cover bg-contain bg-fixed bg-center bg-no-repeat",
            "md:h-40 md:w-40 lg:h-64 lg:w-64"
          )}
        />
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
