import * as React from "react";
import { useRouteLoaderData } from "react-router";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import classNames from "classnames";
import {
  AvailableBanners,
  isAvailableBanner,
  useBannerContent,
} from "~/hooks/useBannerContent";
import { SnaxBanner } from "~/components/Banner/SnaxBanner";
import { assertUnreachable } from "~/data/assertUnreachable";

type Fading = "in" | "out" | null;

export const Banner: React.FC = () => {
  const blogPost = useRouteLoaderData("routes/blog.post.$slug._index") as
    | ExtendedBlogPost
    | undefined;

  const component: string | null = React.useMemo(() => {
    if (blogPost) {
      const { bannerImage } = blogPost;
      return bannerImage?.fields.file.url ?? null;
    }

    return null;
  }, [blogPost]);
  const { currentBanner } = useBannerContent({ switchTimeout: 15000 });

  const [banner, setBanner] = React.useState<AvailableBanners | string | null>(
    component ?? currentBanner
  );

  const [fading, setFading] = React.useState<Fading>(null);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const nextBanner = component ?? currentBanner;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setFading("out");
    timerRef.current = setTimeout(() => {
      setBanner(nextBanner);
      setFading("in");

      timerRef.current = setTimeout(() => {
        setFading(null);
      }, 500);
    }, 500);
  }, [component, currentBanner]);

  return (
    <section
      className={classNames("fade-btm flex h-40 grow lg:h-60 [&>*]:flex-1", {
        "animate-fade-in": fading === "in",
        "animate-fade-out": fading === "out",
      })}
    >
      {(() => {
        if (isAvailableBanner(banner)) {
          switch (banner) {
            case AvailableBanners.SNAX:
              return <SnaxBanner />;
            case AvailableBanners.MEDIUM:
            case AvailableBanners.SLJO:
              throw new Error("Not implemented");
            default:
              assertUnreachable(banner);
          }
        }

        return typeof banner === "string" ? (
          <article
            className="inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${banner})` }}
          />
        ) : null;
      })()}
    </section>
  );
};
