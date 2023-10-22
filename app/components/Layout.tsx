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
      <span className="opacity-60">Location:</span>
      {trail.map(({ label, route }, i) => (
        <React.Fragment key={label}>
          {route ? (
            <LinkWithQuery
              to={route}
              onClick={() => goToBreadcrumb(i)}
              className="font-bold"
            >
              {label}
            </LinkWithQuery>
          ) : (
            <span className="font-bold opacity-60">{label}</span>
          )}
          <ChevronRightIcon size="xs" className="opacity-60" />
        </React.Fragment>
      ))}
      <span className="font-bold opacity-60">{currentPage}</span>
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
          <h1 className="flex-1 grow text-left font-metamorphous text-2xl font-semibold lg:text-3xl">
            {title}
          </h1>
          <section>{subtitle ? subtitle : <>&nbsp;</>}</section>
        </div>
      </section>
      <section className="pt-4">{children}</section>
    </div>
  );
};
