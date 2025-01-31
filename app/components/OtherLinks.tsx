import { LinkedinIcon } from "~/icons/LinkedinIcon";
import * as React from "react";
import { GithubIcon } from "~/icons/GithubIcon";
import { SubstackIcon } from "~/icons/SubstackIcon";
import { YouTubeIcon } from "~/icons/YouTubeIcon";
import { TwitterXIcon } from "~/icons/TwitterXIcon";

const LinkedIn: React.FC = () => {
  return (
    <a
      href="https://www.linkedin.com/in/tmlkmcd/"
      className="flex items-center justify-start gap-2"
    >
      <LinkedinIcon />
      <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
        Linkedin
      </span>
    </a>
  );
};

const Github: React.FC = () => {
  return (
    <a
      href="https://github.com/tmlkmcd/"
      className="flex items-center justify-start gap-2"
    >
      <GithubIcon />
      <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
        Github
      </span>
    </a>
  );
};

const Substack: React.FC = () => {
  return (
    <a
      href="https://tmlkmcd.substack.com/"
      className="flex items-center justify-start gap-2"
    >
      <SubstackIcon />
      <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
        Substack
      </span>
    </a>
  );
};

const YouTube: React.FC = () => {
  return (
    <a
      href="https://www.youtube.com/@MusicianTommy"
      className="flex items-center justify-start gap-2"
    >
      <YouTubeIcon />
      <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
        YouTube
      </span>
    </a>
  );
};

const TwitterX: React.FC = () => {
  return (
    <a
      href="https://x.com/TMLKMCD"
      className="flex items-center justify-start gap-2"
    >
      <TwitterXIcon />
      <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
        Twitter/X
      </span>
    </a>
  );
};

export const OtherLinks: React.FC = () => {
  return (
    <span className="flex flex-wrap justify-center gap-4">
      <Github />
      <span className="hidden md:block">|</span>
      <LinkedIn />
      <span className="hidden md:block">|</span>
      <Substack />
      <span className="hidden md:block">|</span>
      <YouTube />
      <span className="hidden md:block">|</span>
      <TwitterX />
    </span>
  );
};
