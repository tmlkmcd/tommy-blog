import * as React from "react";
import type { ContentfulGenericItems } from "~/rootLoader";
import { useLocation } from "react-router";

export type Breadcrumb = {
  route: string;
  label: string;
};

interface RootContextValue extends ContentfulGenericItems {
  breadcrumbTrail: Breadcrumb[];
  pushBreadcrumb: (breadcrumb: string, refresh?: boolean) => void;
  goToBreadcrumb: (index: number) => void;
  resetBreadcrumbTrail: () => void;
}

const RootContext = React.createContext<RootContextValue | null>(null);

export const RootProvider: React.FC<
  React.PropsWithChildren<ContentfulGenericItems>
> = (props) => {
  const { children, ...otherProps } = props;
  const { pathname, search } = useLocation();
  const route = pathname + search;

  const [breadcrumbTrail, setBreadcrumbTrail] = React.useState<Breadcrumb[]>(
    []
  );

  const pushBreadcrumb = React.useCallback(
    (label: string, refresh: boolean = false) => {
      setBreadcrumbTrail((breadcrumbs) => {
        if (refresh) return [{ label, route }];

        if (breadcrumbs.length >= 1) {
          const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
          if (
            lastBreadcrumb.label === label &&
            lastBreadcrumb.route === route
          ) {
            return breadcrumbs;
          }
        }
        return [...breadcrumbs, { label, route }];
      });
    },
    [route]
  );

  const goToBreadcrumb = (index: number) => {
    setBreadcrumbTrail((breadcrumbs) => breadcrumbs.slice(0, index));
  };

  const resetBreadcrumbTrail = () => {
    setBreadcrumbTrail([]);
  };

  const value = {
    ...otherProps,
    breadcrumbTrail,
    pushBreadcrumb,
    goToBreadcrumb,
    resetBreadcrumbTrail,
  };

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRootContext = () => {
  const context = React.useContext(RootContext);

  if (!context) {
    throw new Error("useRootContext must be used within RootProvider");
  }

  return context;
};
