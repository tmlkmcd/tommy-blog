import * as React from "react";
import classNames from "classnames";

interface Props
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {
  variant?: "primary" | "invisible";
}

export const Button: React.FC<Props> = ({
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        variant !== "invisible" && "disabled:bg-nobel-800",
        variant === "primary" && "bg-pinkApotheosis-200",
        variant === "invisible" && "",
        className
      )}
      {...props}
    />
  );
};
