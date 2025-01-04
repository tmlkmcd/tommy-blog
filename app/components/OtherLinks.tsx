import { LinkedinIcon } from "~/icons/LinkedinIcon";
import * as React from "react";
import { GithubIcon } from "~/icons/GithubIcon";
import { MediumIcon } from "~/icons/MediumIcon";
import { InstagramIcon } from "~/icons/InstagramIcon";
import { YouTubeIcon } from "~/icons/YouTubeIcon";
import { TwitterXIcon } from "~/icons/TwitterXIcon";
import { BlueskyIcon } from "~/icons/BlueskyIcon";

interface LinkProps {
  showNameText?: boolean;
}

const LinkedIn: React.FC<LinkProps> = ({ showNameText }) => {
  return (
    <a
      href="https://www.linkedin.com/in/tmlkmcd/"
      className="flex items-center justify-start gap-2"
    >
      <LinkedinIcon />
      {showNameText && (
        <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
          Linkedin
        </span>
      )}
    </a>
  );
};

const Github: React.FC<LinkProps> = ({ showNameText }) => {
  return (
    <a
      href="https://github.com/tmlkmcd/"
      className="flex items-center justify-start gap-2"
    >
      <GithubIcon />
      {showNameText && (
        <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
          Github
        </span>
      )}
    </a>
  );
};

const Medium: React.FC<LinkProps> = ({ showNameText }) => {
  return (
    <a
      href="https://medium.com/@tmlkm"
      className="flex items-center justify-start gap-2"
    >
      <MediumIcon />
      {showNameText && (
        <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
          Medium
        </span>
      )}
    </a>
  );
};

const Instagram: React.FC<LinkProps> = ({ showNameText }) => {
  return (
    <a
      href="https://medium.com/@tmlkm"
      className="flex items-center justify-start gap-2"
    >
      <InstagramIcon />
      {showNameText && (
        <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
          Instagram
        </span>
      )}
    </a>
  );
};

const YouTube: React.FC<LinkProps> = ({ showNameText }) => {
  return (
    <a
      href="https://www.youtube.com/@MusicianTommy"
      className="flex items-center justify-start gap-2"
    >
      <YouTubeIcon />
      {showNameText && (
        <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
          YouTube
        </span>
      )}
    </a>
  );
};

const TwitterX: React.FC<LinkProps> = ({ showNameText }) => {
  return (
    <a
      href="https://x.com/TMLKMCD"
      className="flex items-center justify-start gap-2"
    >
      <TwitterXIcon />
      {showNameText && (
        <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
          Twitter/X
        </span>
      )}
    </a>
  );
};

const Bluesky: React.FC<LinkProps> = ({ showNameText }) => {
  return (
    <a
      href="https://bsky.app/profile/himynameistommy.bsky.social"
      className="flex items-center justify-start gap-2"
    >
      <BlueskyIcon />
      {showNameText && (
        <span className="text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300">
          Bluesky
        </span>
      )}
    </a>
  );
};

export const OtherLinks: React.FC = () => {
  return (
    <span className="flex flex-wrap justify-center gap-4">
      <Github showNameText />
      <span className="hidden md:block">|</span>
      <LinkedIn showNameText />
      <span className="hidden md:block">|</span>
      <Medium showNameText />
      <span className="hidden md:block">|</span>
      <Instagram showNameText />
      <span className="hidden md:block">|</span>
      <YouTube showNameText />
      <span className="hidden md:block">|</span>
      <TwitterX showNameText />
      <span className="hidden md:block">|</span>
      <Bluesky showNameText />
    </span>
  );
};
