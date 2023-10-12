import * as React from "react";
import { useRootContext } from "~/RootContext";
import { Layout } from "~/components/Layout";
import classNames from "classnames";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { PageName } from "~/Pages";

export default function Index() {
  const { pushBreadcrumb, categories } = useRootContext();
  const [animating, setAnimating] = React.useState<number>(0);

  React.useEffect(() => {
    pushBreadcrumb(PageName.Tags, true);
    document.title = "Tags - Tommy's Blog";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  React.useEffect(() => {
    if (animating === 0) {
      setTimeout(() => {
        setAnimating(1);
      }, 500);
      return;
    }

    if (animating < categories.length) {
      setTimeout(() => {
        setAnimating((prev) => prev + 1);
      }, 120);
    }
  }, [animating, categories.length]);

  return (
    <Layout title="Tags">
      <ul className="list-disc">
        {categories.map((category, i) => {
          return (
            <li key={category}>
              <LinkWithQuery
                className={classNames(
                  animating <= i && "invisible translate-x-[2rem]",
                  animating > i && "animate-slide-in-side-fancy"
                )}
                to={`/blog/tags/${category.toLowerCase()}`}
              >
                {category}
              </LinkWithQuery>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
