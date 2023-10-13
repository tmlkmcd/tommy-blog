import * as React from "react";
import type { ExtendedBlogPost, Series } from "~/components/contentful/types";
import { formatBlogDate } from "~/data/dates";
import { Categories } from "~/components/contentful/Categories";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { useLocation, useNavigate } from "react-router";
import type { Entry } from "contentful";
import classNames from "classnames";

interface Props {
  posts: ExtendedBlogPost[];
  showSeries?: boolean;
}

interface PreviewProps {
  title: string;
  blurb?: string;
  imgSrc?: string | null;
  categories?: string[];
  slug: string;
  showSeries?: boolean;
  series?: Entry<Series>;
  date?: Date | string;
  className?: string;
}

export const PostPreviewGrid: React.FC<Props> = ({
  posts,
  showSeries = true,
}) => {
  const items = posts.map<PreviewProps>((post) => ({
    title: post.title,
    blurb: post.blurb,
    imgSrc: post.image?.fields.file.url ?? null,
    categories: post.categories.map(({ fields: { name } }) => name),
    slug: post.slug,
    series: post.series,
    date: post.published,
    showSeries,
  }));

  return <GeneralPreviewGrid items={items} />;
};

export const GeneralPreviewGrid: React.FC<{ items: PreviewProps[] }> = ({
  items,
}) => {
  const [animating, setAnimating] = React.useState<number>(0);

  React.useEffect(() => {
    if (animating === 0) {
      setTimeout(() => {
        setAnimating(1);
      }, 500);
      return;
    }

    if (animating < items.length) {
      setTimeout(() => {
        setAnimating((prev) => prev + 1);
      }, 120);
    }
  }, [animating, items.length]);

  return (
    <section className="flex flex-col gap-2 sm:grid sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => {
        const className = classNames(
          animating <= index && "invisible translate-y-[1.5rem]",
          animating > index && "animate-slide-in-side-fancy"
        );
        return (
          <GridItemPreview key={item.slug} {...item} className={className} />
        );
      })}
    </section>
  );
};

const GridItemPreview: React.FC<PreviewProps> = React.memo(
  function GridItemPreview({
    title,
    blurb,
    imgSrc = null,
    categories,
    slug,
    showSeries = true,
    series,
    date,
    className = "",
  }) {
    const { search } = useLocation();
    const navigate = useNavigate();

    return (
      <button
        className={classNames(
          "flex flex-col rounded bg-nobel-400 bg-opacity-60 text-left transition-all hover:brightness-125",
          className
        )}
        onClick={() => {
          navigate(`/blog/post/${slug}${search}`);
        }}
      >
        <section className="relative w-full">
          <div
            className="fade-btm absolute inset-0 w-full rounded-t bg-cover opacity-50"
            style={{ backgroundImage: `url(${imgSrc})` }}
          />
          <div className="flex justify-center">
            {imgSrc && <img src={imgSrc} className="fade-btm" alt="" />}
          </div>
          {date && (
            <div className="fade-top absolute inset-x-0 bottom-0 flex grow flex-col bg-nobel-400 bg-opacity-60 px-2 pt-6">
              <header className="mx-1 flex items-center gap-1 border-b border-dashed border-nobel-700">
                {formatBlogDate(date)}
              </header>
            </div>
          )}
        </section>
        <div className="flex grow flex-col px-2 pb-2">
          <span className="pt-2 text-xl lg:text-2xl">{title}</span>
          {categories && <Categories categories={categories} />}
          <span className="pt-2 text-sm md:text-base">{blurb}</span>
          {showSeries && series && (
            <span className="pt-2 text-sm">
              Part a series on{" "}
              <LinkWithQuery
                to={`/blog/series/${series.fields.slug}`}
                onClick={(ev) => ev.stopPropagation()}
              >
                {series.fields.name}
              </LinkWithQuery>
              .
            </span>
          )}
        </div>
      </button>
    );
  }
);
