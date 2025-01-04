import * as React from "react";
import { DblChevronIcon } from "~/icons/DoubleChevron";

interface Props {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Paginator: React.FC<Props> = ({ page, total, onPageChange }) => {
  const canGoBack = page > 1;
  const canGoAhead = page < total;

  const mid = React.useMemo(() => {
    const lowerBound = Math.max(1, page - 2);
    const upperBound = Math.min(total, page + 2);

    const includeLowerEllipsis = lowerBound >= 3;
    const includeUpperEllipsis = upperBound <= total - 3;

    return [
      ...(includeLowerEllipsis ? [1, "..."] : []),
      ...range(
        includeLowerEllipsis ? lowerBound : 1,
        includeUpperEllipsis ? upperBound : total
      ),
      ...(includeUpperEllipsis ? ["...", total] : []),
    ];
  }, [page, total]);

  return (
    <div className="mt-4 flex flex-row justify-between md:mx-4 lg:mx-6 xl:mx-8">
      <button
        className="flex flex-row items-center gap-2 text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300 enabled:underline disabled:text-nobel-700"
        disabled={!canGoBack}
        onClick={() => onPageChange(page - 1)}
      >
        <DblChevronIcon direction="left" size="xs" /> back
      </button>
      <section className="flex flex-row gap-1.5">
        {mid.map((navigatorPage) => {
          if (typeof navigatorPage === "string")
            return <span className="mx-1">...</span>;
          if (navigatorPage === page)
            return <span className="mx-0.5 font-bold">{page}</span>;
          return (
            <button
              key={navigatorPage}
              className=" text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300 enabled:underline"
              onClick={() => onPageChange(navigatorPage)}
            >
              {navigatorPage}
            </button>
          );
        })}
      </section>
      <button
        className="flex flex-row items-center gap-2 text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300 enabled:underline disabled:text-nobel-700"
        disabled={!canGoAhead}
        onClick={() => onPageChange?.(page + 1)}
      >
        next <DblChevronIcon direction="right" size="xs" />
      </button>
    </div>
  );
};

function range(start: number, end: number) {
  return Array.from(
    {
      length: Math.floor(end + 1 - start),
    },
    (v, i) => start + i
  );
}
