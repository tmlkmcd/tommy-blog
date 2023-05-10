import * as React from "react";
import { LinkWithQuery } from "~/components/LinkWithQuery";

interface Props {
  path: string;
  label: string;
  subItems?: Props[];
}

export const HeaderLink: React.FC<Props> = ({ path, label, subItems = [] }) => {
  return (
    <div className="flex px-4 py-2 md:py-4">
      <LinkWithQuery to={path}>{label}</LinkWithQuery>
    </div>
  );
};

const NestedHeaderLink: React.FC<Props> = () => {
  return <div />;
};
