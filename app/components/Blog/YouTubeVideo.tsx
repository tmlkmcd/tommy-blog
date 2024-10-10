import * as React from "react";

interface Props {
  videoId: string;
}

export const YouTubeVideo: React.FC<Props> = ({ videoId }) => {
  return (
    <div className="flex justify-center">
      <iframe
        className="aspect-video w-full max-w-[800px]"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube video player"
      />
    </div>
  );
};
