import * as React from "react";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { useLocation } from "react-router";
import classNames from "classnames";

interface Props {
  path: string;
  label: string;
  subItems?: Props[];
}

export const HeaderLink: React.FC<Props> = ({ path, label, subItems = [] }) => {
  const { pathname } = useLocation();

  return (
    <LinkWithQuery to={path} className="flex-1">
      <div
        className={classNames(
          "px-4 pt-2 text-center text-lg text-iceColdStare-300 md:pt-4",
          "after:content-[' '] after:mx-auto after:block after:border-b",
          "after:w-0 after:opacity-50",
          "after:transition-500 after:transition-all hover:after:w-[30%] md:hover:after:w-[80%]",
          pathname.startsWith(path) &&
            "font-bold text-iceColdStare-50 after:w-[25%] after:opacity-100 md:after:w-[70%]"
        )}
      >
        {label}
      </div>
    </LinkWithQuery>
  );
};

const NestedHeaderLink: React.FC<Props> = () => {
  return <div />;
};
