import * as React from "react";
import { Link, useSearchParams } from "@remix-run/react";
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
  const [searchParams] = useSearchParams();
  let suffix = "";
  const cfToken = searchParams.get("cf_token");

  if (cfToken) {
    if (to.includes("?")) {
      suffix = `&cf_token=${cfToken}`;
    } else {
      suffix = `?cf_token=${cfToken}`;
    }
  }

  const fullClassName = classNames(
    variant === "primary" &&
      "text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300 underline",
    className
  );

  return (
    <Link to={`${to}${suffix}`} className={fullClassName} {...props}>
      {children}
    </Link>
  );
};
