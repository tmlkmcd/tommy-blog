import { LinkedinIcon } from "~/icons/LinkedinIcon";
import * as React from "react";
import { GithubIcon } from "~/icons/GithubIcon";
import { MediumIcon } from "~/icons/MediumIcon";
import { assertUnreachable } from "~/data/assertUnreachable";
import { InstagramIcon } from "~/icons/InstagramIcon";

export enum OutsideLink {
  GITHUB = "GITHUB",
  LINKEDIN = "LINKEDIN",
  INSTAGRAM = "INSTAGRAM",
  MEDIUM = "MEDIUM",
}

interface Props {
  links: OutsideLink[];
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

export const Subtitle: React.FC<Props> = ({ links }) => {
  return (
    <span className="flex gap-2">
      {links.map((link) => {
        switch (link) {
          case OutsideLink.GITHUB:
            return <Github key={link} />;
          case OutsideLink.LINKEDIN:
            return <LinkedIn key={link} />;
          case OutsideLink.MEDIUM:
            return <Medium key={link} />;
          case OutsideLink.INSTAGRAM:
            return <Instagram key={link} />;
          default:
            assertUnreachable(link);
        }
      })}
    </span>
  );
};
