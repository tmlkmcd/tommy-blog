import * as React from "react";
import type { Category } from "~/components/contentful/types";
import type { Entry } from "contentful";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { formatBlogDate, getTime } from "~/data/dates";

interface Props {
  categories: Entry<Category>[];
  published?: string;
  updated?: string;
}

export const Categories: React.FC<Props> = ({
  categories = [],
  published,
  updated,
}) => {
  return (
    <div className=" text-sm">
      <Published published={published} />
      {categories.map((category, i) => (
        <React.Fragment key={category.sys.id}>
          {!!i && ", "}
          <CategoryLink category={category} />
        </React.Fragment>
      ))}
      <Updated updated={updated} />
    </div>
  );
};

const CategoryLink: React.FC<{ category: Entry<Category> }> = ({
  category,
}) => {
  const label = category.fields.name;
  return (
    <LinkWithQuery
      to={`/blog/tags/${label.toLowerCase()}`}
      className="text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
      onClick={(e) => e.stopPropagation()}
    >
      <>{label}</>
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
      &nbsp; in&nbsp;
    </span>
  );
};

const Updated: React.FC<{ updated?: string }> = ({ updated }) => {
  if (!updated) return null;
  return (
    <span className="italic text-iceColdStare-800">
      &nbsp; (last updated: {formatBlogDate(updated)} @ {getTime(updated)})
    </span>
  );
};
