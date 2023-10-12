import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "@remix-run/react";
import classNames from "classnames";

export const LinkWithQuery: React.FC<
  React.PropsWithChildren<
    {
      to: string;
      className?: string;
      variant?: "primary" | "other";
    } & React.ComponentProps<typeof Link>
  >
> = ({ children, to, variant = "primary", className, ...props }) => {
  const { search } = useLocation();

  const fullClassName = classNames(
    variant === "primary" &&
      "text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300 underline",
    className
  );

  return (
    <Link to={`${to}${search}`} className={fullClassName} {...props}>
      {children}
    </Link>
  );
};
