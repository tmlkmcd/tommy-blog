import * as React from "react";
import { OtherLinks } from "~/components/OtherLinks";
import { ReactIcon } from "~/icons/ReactIcon";
import { RemixIcon } from "~/icons/RemixIcon";
import { GithubIcon } from "~/icons/GithubIcon";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="space-y-4 border-t bg-pinkApotheosis-50 bg-opacity-60 px-8 py-4 text-left lg:px-12">
      <OtherLinks />
      <div>&copy; 2022-{currentYear} Thomas McDevitt.</div>
      <div>
        Apologies for how bare this site is. It's still under construction! 😬
      </div>
      <div className="mx-auto max-w-[400px] items-center text-sm italic">
        This website is built with{" "}
        <a
          href="https://react.dev/"
          className="whitespace-nowrap text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
        >
          <ReactIcon className="inline-block" size="sm" /> React.js
        </a>{" "}
        library and the{" "}
        <a
          href="https://remix.run/"
          className="whitespace-nowrap text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
        >
          <RemixIcon className="inline-block" size="sm" /> Remix
        </a>{" "}
        framework. The source code can be found on{" "}
        <a
          href="https://github.com/tmlkmcd/tommy-blog"
          className="whitespace-nowrap text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
        >
          <GithubIcon className="inline-block" size="sm" /> Github
        </a>
        .
      </div>
    </footer>
  );
};

// https://github.com/tmlkmcd/tommy-blog
