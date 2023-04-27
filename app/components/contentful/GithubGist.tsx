import * as React from "react";
import type { GistProps } from "react-gist";
import Gist from "react-gist";
import classNames from "classnames";
import { GithubIcon } from "~/icons/GithubIcon";

export const GithubGistDisplay: React.FC<GistProps> = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const wrapper = React.useRef<HTMLSpanElement>(null);

  const toggle = () => {
    if (!expanded) {
      setTimeout(() => {
        wrapper.current?.scrollIntoView({ behavior: "smooth" });
      }, 10);
    }

    setExpanded(!expanded);
  };

  return (
    <span className="mx-auto block md:max-w-[95%] lg:max-w-[90%]" ref={wrapper}>
      <span className="flex items-center justify-start gap-2 px-4 text-sm">
        <button
          onClick={toggle}
          className="text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
        >
          {expanded ? "Collapse..." : "Expand..."}
        </button>
        <span>or,</span>
        <a
          href={`https://gist.github.com/tmlkmcd/${props.id}`}
          className="flex items-center justify-start gap-2 text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
        >
          <span>visit the gist on Github</span>{" "}
          <GithubIcon className="inline-block" />
        </a>
      </span>
      <span
        className={classNames(
          "block max-w-full overflow-hidden",
          expanded || "fade max-h-[300px]"
        )}
      >
        <Gist {...props} />
      </span>
    </span>
  );
};

export const GithubGistError: React.FC = () => {
  return (
    <div className="">
      There was meant to be a github gist here but it failed to load. Apologies!
      That's on me.
    </div>
  );
};
