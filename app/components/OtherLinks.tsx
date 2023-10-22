import { LinkedinIcon } from "~/icons/LinkedinIcon";
import * as React from "react";
import { GithubIcon } from "~/icons/GithubIcon";
import { MediumIcon } from "~/icons/MediumIcon";
import { InstagramIcon } from "~/icons/InstagramIcon";

export enum OutsideLink {
  GITHUB = "GITHUB",
  LINKEDIN = "LINKEDIN",
  INSTAGRAM = "INSTAGRAM",
  MEDIUM = "MEDIUM",
}

const LinkedIn: React.FC = () => {
  return (
    <a
      href="https://www.linkedin.com/in/tmlkmcd/"
      className="flex items-center justify-start gap-2 text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
    >
      <LinkedinIcon /> Linkedin
    </a>
  );
};

const Github: React.FC = () => {
  return (
    <a
      href="https://github.com/tmlkmcd/"
      className="flex items-center justify-start gap-2 text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
    >
      <GithubIcon /> Github
    </a>
  );
};

const Medium: React.FC = () => {
  return (
    <a
      href="https://medium.com/@tmlkm"
      className="flex items-center justify-start gap-2 text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
    >
      <MediumIcon /> Medium
    </a>
  );
};

const Instagram: React.FC = () => {
  return (
    <a
      href="https://medium.com/@tmlkm"
      className="flex items-center justify-start gap-2 text-sm text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
    >
      <InstagramIcon /> Instagram
    </a>
  );
};

export const OtherLinks: React.FC = () => {
  return (
    <span className="flex flex-wrap justify-center gap-2">
      <Github />
      <span className="hidden md:block">|</span>
      <LinkedIn />
      <span className="hidden md:block">|</span>
      <Medium />
      <span className="hidden md:block">|</span>
      <Instagram />
    </span>
  );
};
