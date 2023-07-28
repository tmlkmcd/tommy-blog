import * as React from "react";
import { OpenSpeechMarkIcon } from "~/icons/OpenSpeechMarkIcon";

export const Blockquote: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <blockquote className="mx-4 flex gap-4 border-l-4 border-sapphireSplendour-700 bg-sapphireSplendour-700 bg-opacity-10 p-4 italic shadow-casual">
      <span className="text-sapphireSplendour-700 opacity-80">
        <OpenSpeechMarkIcon size="lg" />
      </span>
      <span className="flex items-center">{children}</span>
    </blockquote>
  );
};
