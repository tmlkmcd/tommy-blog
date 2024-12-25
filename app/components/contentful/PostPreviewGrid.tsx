import * as React from "react";
import type { ExtendedBlogPost, Series } from "~/data/contentful/types";
import { formatBlogDate } from "~/data/dates";
import { Categories } from "~/components/contentful/Categories";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import type { Entry } from "contentful";
import classNames from "classnames";
import { useCascadeAnimate } from "~/hooks/useCascadeAnimate";

interface Props {
  posts: ExtendedBlogPost[];
  showSeries?: boolean;
}

interface PreviewProps {
  title: string;
  blurb?: string;
  imgSrc?: string | null;
  categories?: string[];
  id: string | number;
  showSeries?: boolean;
  series?: Entry<Series>;
  date?: Date | string;
  target: string;
  className?: string;
}

export const PostPreviewGrid: React.FC<Props> = ({
  posts,
  showSeries = true,
}) => {
  const items = posts.map<PreviewProps>((post) => {
    let imgSrc = null;
    try {
      imgSrc = post.bannerImages.fields.previewBannerImage.fields.file.url;
    } catch (e) {
      /* nothing */
    }
    return {
      title: post.title,
      blurb: post.blurb,
      imgSrc,
      categories: (post?.categories ?? []).map(({ fields: { name } }) => name),
      id: post.slug,
      series: post.series,
      date: post.published,
      target: `/blog/post/${post.slug}`,
      showSeries,
    };
  });

  return <GeneralPreviewGrid items={items} />;
};

export const GeneralPreviewGrid: React.FC<{ items: PreviewProps[] }> = ({
  items,
}) => {
  const { animating } = useCascadeAnimate({ limit: items.length });

  return (
    <section className="flex flex-col gap-2 sm:grid sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => {
        const className = classNames(
          animating <= index && "invisible motion-safe:translate-y-[1.5rem]",
          animating > index &&
            "motion-safe:animate-fade-in-fancy motion-reduce:animate-fade-in"
        );
        return (
          <GridItemPreview key={item.id} {...item} className={className} />
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
    showSeries = true,
    series,
    date,
    target,
    className = "",
  }) {
    return (
      <section
        className={classNames(
          "relative flex flex-col rounded bg-nobel-400 bg-opacity-60 text-left transition-all duration-300 [&:has(.peer:hover)]:brightness-125",
          className
        )}
      >
        <LinkWithQuery to={target} className="group peer relative w-full">
          <div className="relative">
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
          </div>
          <h2
            className={classNames(
              "px-2 pt-2 text-xl underline decoration-transparent transition-all duration-300 lg:text-2xl",
              "hover:text-sapphireSplendour-300 hover:decoration-current group-hover:text-sapphireSplendour-300 group-hover:decoration-current"
            )}
          >
            {title}
          </h2>
        </LinkWithQuery>
        <div className="flex grow flex-col items-start gap-2 px-2 [&>*]:last:pb-2 peer-hover:[&>h2>a]:text-pasta-800 peer-hover:[&>h2>a]:decoration-current">
          {categories && <Categories categories={categories} />}
          <span className="text-sm md:text-base">{blurb}</span>
          {showSeries && series && (
            <span className="text-sm">
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
      </section>
    );
  }
);
