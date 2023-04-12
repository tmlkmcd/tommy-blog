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
      <section className="flex flex-row items-center ">
        <div className="hidden h-20 shrink-0 md:block md:basis-40 lg:h-32 lg:h-32 lg:basis-64 " />
        <h1 className="flex-1 grow p-4 text-left font-semibold">{title}</h1>
        {subtitle}
      </section>
      {children}
    </div>
  );
};
