import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {
  path: string;
  label: string;
  subItems?: Props[];
}

export const HeaderLink: React.FC<Props> = ({ path, label, subItems = [] }) => {
  return (
    <div className="flex px-4 py-2 md:py-4">
      <Link to={path}>{label}</Link>
    </div>
  );
};

const NestedHeaderLink: React.FC<Props> = () => {
  return <div />;
};
