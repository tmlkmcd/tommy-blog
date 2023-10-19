import * as React from "react";
import type { GistProps } from "react-gist";
import Gist from "react-gist";
import classNames from "classnames";
import { GithubIcon } from "~/icons/GithubIcon";

export const BlockGithubGistDisplay: React.FC<
  GistProps & { expandable: boolean }
> = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const wrapper = React.useRef<HTMLSpanElement>(null);

  const { expandable, ...gistProps } = props;

  const toggle = (scroll = false) => {
    if (scroll) {
      setTimeout(() => {
        wrapper.current?.scrollIntoView({ behavior: "smooth" });
      }, 10);
    }

    setExpanded((currentlyExpanded) => !currentlyExpanded);
  };

  return (
    <span className="mx-auto block md:max-w-[95%] lg:max-w-[90%]" ref={wrapper}>
      {expandable && (
        <span className="flex items-center justify-start gap-2 px-4 text-sm">
          <button
            onClick={() => toggle(!expanded)}
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
      )}
      <span
        className={classNames(
          "block max-w-full overflow-hidden",
          expandable && !expanded && "fade-btm max-h-[300px]"
        )}
      >
        <Gist {...gistProps} />
      </span>
      {expanded && (
        <button
          onClick={() => toggle(true)}
          className="gap-2 px-4 text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
        >
          Collapse...
        </button>
      )}
    </span>
  );
};

export const TooltipGistDisplay: React.FC<GistProps & { tooltip: string }> = (
  props
) => {
  const { tooltip, ...gistProps } = props;

  const [translate, setTranslate] = React.useState<number>(0);
  const [screenIsWideEnough, setScreenIsWideEnough] =
    React.useState<boolean>(false);
  const tooltipText = React.useRef<HTMLAnchorElement>(null);

  const reCenter = () => {
    if (tooltipText.current) {
      const { x } = tooltipText.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const newTranslate = -1 * ((x - windowWidth) / windowWidth + 1);
      setTranslate(newTranslate);
    }
  };

  React.useEffect(() => {
    reCenter();
    setScreenIsWideEnough(window.innerWidth > 600);
  }, []);

  return (
    <span
      className="relative z-[999] [&>span]:hover:animate-fade-in"
      onMouseEnter={reCenter}
    >
      <a
        href={`https://gist.github.com/tmlkmcd/${props.id}`}
        className={classNames(
          "underline",
          screenIsWideEnough
            ? "decoration-dotted"
            : "text-sapphireSplendour-700 transition hover:text-sapphireSplendour-300"
        )}
        ref={tooltipText}
      >
        {tooltip}
      </a>
      {screenIsWideEnough && (
        <span
          className={classNames(
            "pointer-events-none absolute bottom-4 left-0 w-[500px] animate-fade-out rounded border border-black border-opacity-50 shadow-gistTooltip"
          )}
          style={{ transform: `translateX(${translate * 100}%)` }}
        >
          <Gist {...gistProps} />
        </span>
      )}
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
