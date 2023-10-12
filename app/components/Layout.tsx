import * as React from "react";
import { useRootContext } from "~/RootContext";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { ChevronRightIcon } from "~/icons/Chevron";

const BreadcrumbTrail: React.FC = () => {
  const { breadcrumbTrail, goToBreadcrumb } = useRootContext();
  const trail = breadcrumbTrail.slice(0, breadcrumbTrail.length - 1);
  const currentPage = breadcrumbTrail[breadcrumbTrail.length - 1]?.label;

  if (!currentPage) {
    return <>&nbsp;</>;
  }

  return (
    <div className="inline-flex items-center gap-1">
      Location:
      {trail.map(({ label, route }, i) => (
        <React.Fragment key={label}>
          <LinkWithQuery
            to={route}
            onClick={() => goToBreadcrumb(i)}
            className="font-bold"
          >
            {label}
          </LinkWithQuery>
          <ChevronRightIcon size="xs" />
        </React.Fragment>
      ))}
      <span className="font-bold">{currentPage}</span>
    </div>
  );
};

interface Props {
  title: string;
  subtitle?: React.ReactNode;
}
export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle = null,
  children,
}) => {
  return (
    <div>
      <section className="flex flex-row items-center">
        <div className="hidden h-20 shrink-0 md:block md:basis-40 lg:h-32 lg:basis-64" />
        <div className="flex flex-col gap-0 p-4">
          <section className="text-sm">
            <BreadcrumbTrail />
          </section>
          <h1 className="flex-1 grow text-left font-metamorphous text-xl font-semibold md:text-2xl lg:text-3xl">
            {title}
          </h1>
          <section>{subtitle ? subtitle : <>&nbsp;</>}</section>
        </div>
      </section>
      {children}
    </div>
  );
};
