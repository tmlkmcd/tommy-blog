import * as React from "react";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { formatBlogDate, getTime } from "~/data/dates";

interface Props {
  categories: string[];
  published?: string;
  updated?: string;
}

export const Categories: React.FC<Props> = ({
  categories = [],
  published,
  updated,
}) => {
  return (
    <div className="text-sm">
      <Published published={published} />
      {categories.map((category, i) => (
        <React.Fragment key={category}>
          {!!i && ", "}
          <CategoryLink category={category} />
        </React.Fragment>
      ))}
      <Updated updated={updated} />
    </div>
  );
};

const CategoryLink: React.FC<{ category: string }> = ({ category }) => {
  return (
    <LinkWithQuery
      to={`/blog/tags/${category.toLowerCase()}`}
      onClick={(e) => e.stopPropagation()}
    >
      <>{category}</>
    </LinkWithQuery>
  );
};

const Published: React.FC<{ published?: string }> = ({ published }) => {
  if (!published) return null;
  return (
    <span>
      <span className="font-bold text-iceColdStare-800">
        {formatBlogDate(published)} @ {getTime(published)}
      </span>
      &nbsp;in&nbsp;
    </span>
  );
};

const Updated: React.FC<{ updated?: string }> = ({ updated }) => {
  if (!updated) return null;
  return (
    <span className="italic text-iceColdStare-800">
      &nbsp;(last updated: {formatBlogDate(updated)} @ {getTime(updated)})
    </span>
  );
};
