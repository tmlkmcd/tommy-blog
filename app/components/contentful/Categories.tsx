import * as React from "react";
import type { Category } from "~/components/contentful/types";
import { Link } from "@remix-run/react";
import type { Entry } from "contentful";

interface Props {
  categories: Entry<Category>[];
  leadingText?: React.ReactNode;
}

export const Categories: React.FC<Props> = ({
  categories,
  leadingText = false,
}) => {
  return (
    <div className="text-sm">
      {leadingText}
      {categories.map((category, i) => (
        <React.Fragment key={category.sys.id}>
          {!!i && ", "}
          <CategoryLink category={category} />
        </React.Fragment>
      ))}
    </div>
  );
};

const CategoryLink: React.FC<{ category: Entry<Category> }> = ({
  category,
}) => {
  const label = category.fields.name;
  return (
    <Link
      to={`/blog/tags/${label.toLowerCase()}`}
      className="text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
    >
      <>{label}</>
    </Link>
  );
};
