import * as React from "react";

interface Props {
  title: string;
  supertitle?: React.ReactNode;
  subtitle?: React.ReactNode;
}
export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  supertitle,
  subtitle = null,
  children,
}) => {
  return (
    <div>
      <section className="flex flex-row items-center">
        <div className="hidden h-20 shrink-0 md:block md:basis-40 lg:h-32 lg:h-32 lg:basis-64 " />
        <div className="flex flex-col gap-2 p-4">
          {supertitle && <section>{supertitle}</section>}
          <h1 className="flex-1 grow text-left text-xl font-semibold md:text-2xl lg:text-3xl">
            {title}
          </h1>
          {subtitle && <section>{subtitle}</section>}
        </div>
      </section>

      {children}
    </div>
  );
};
