import * as React from "react";
import type { HeadingItem } from "~/data/contentful/types";
import { headingToKebabCase } from "~/data/blogPosts";
import classNames from "classnames";

interface Props {
  headings?: HeadingItem[] | null;
}

export const Contents: React.FC<Props> = ({ headings = null }) => {
  const hierarchy = React.useMemo(() => buildHierarchy(headings), [headings]);
  const [expanded, setExpanded] = React.useState(false);

  if (!headings || hierarchy?.length === 0) {
    return null;
  }

  const scroll = (to: string) => {
    const target = document.getElementById(to);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.pushState(null, "", `#${to}`);
  };

  const toggleExpanded = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <section
      className={classNames(
        "flex flex-col justify-around gap-0",
        !expanded &&
          "opacity-50 transition-opacity duration-300 hover:opacity-100"
      )}
    >
      <div
        className={classNames(
          "border border-pasta-600 bg-white bg-opacity-60 shadow-lg",
          expanded && "rounded-t p-2"
        )}
      >
        {expanded && (
          <>
            <h2 className="my-2 text-xl font-bold">Contents</h2>
            <ul className={classNames("block max-w-full space-y-1.5")}>
              {hierarchy.map((heading) => (
                <li key={heading.heading}>
                  <button
                    onClick={() => scroll(heading.location)}
                    className={classNames(
                      "duration-600 text-left transition-colors hover:text-pasta-700",
                      heading.level === 1 && "text-lg",
                      heading.level === 2 && "ml-2 text-base",
                      heading.level >= 3 && "text-sm",
                      heading.level === 3 && "ml-3",
                      heading.level === 4 && "ml-4",
                      heading.level === 5 && "ml-5",
                      heading.level === 6 && "ml-6"
                    )}
                  >
                    {heading.heading}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button
        onClick={toggleExpanded}
        className="mx-auto rounded-b-full bg-pasta-600 px-4 py-1 text-right text-sm shadow-lg"
      >
        {expanded ? "Collapse" : "Show table of contents"}
      </button>
    </section>
  );
};

interface HierarchyItem {
  heading: string;
  location: string;
  level: number;
}

function buildHierarchy(headings?: HeadingItem[] | null): HierarchyItem[] {
  if (!headings) {
    return [];
  }

  const hierarchy: HierarchyItem[] = [];
  let bullets = [0];

  const minLevel = Math.min(...headings.map((h) => h.level));

  headings
    .map((heading) => {
      return {
        heading: heading.heading,
        level: heading.level - minLevel + 1,
      };
    })
    .forEach((heading) => {
      if (heading.level === bullets.length) {
        const last = bullets.pop();
        if (last) {
          bullets.push(last + 1);
        }
      }

      if (heading.level > bullets.length) {
        bullets.push(1);
      }

      if (heading.level < bullets.length) {
        bullets = bullets.slice(0, heading.level);
        const last = bullets.pop();
        if (last) {
          bullets.push(last + 1);
        }
      }

      hierarchy.push({
        heading: `${bullets.join(".")} ${heading.heading}`,
        location: headingToKebabCase(heading.heading),
        level: heading.level,
      });
    });

  return hierarchy;
}
