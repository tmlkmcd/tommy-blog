import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "@remix-run/react";

export const LinkWithQuery: React.FC<
  React.PropsWithChildren<
    {
      to: string;
    } & React.ComponentProps<typeof Link>
  >
> = ({ children, to, ...props }) => {
  const { search } = useLocation();
  return (
    <Link to={`${to}${search}`} {...props}>
      {children}
    </Link>
  );
};
