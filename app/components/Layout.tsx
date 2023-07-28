import * as React from "react";

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
          <h1 className="flex-1 grow text-left font-metamorphous text-xl font-semibold md:text-2xl lg:text-3xl">
            {title}
          </h1>
          {subtitle && <section>{subtitle}</section>}
        </div>
      </section>
      {children}
    </div>
  );
};
