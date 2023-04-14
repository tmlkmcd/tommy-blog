import * as React from "react";
import type { ContentfulGenericItems } from "~/rootLoader";

const RootContext = React.createContext<ContentfulGenericItems | null>(null);

export const RootProvider: React.FC<
  React.PropsWithChildren<ContentfulGenericItems>
> = (props) => {
  const { children, ...value } = props;

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRootContext = () => {
  const context = React.useContext(RootContext);

  if (!context) {
    throw new Error("useRootContext must be used within RootProvider");
  }

  return context;
};
