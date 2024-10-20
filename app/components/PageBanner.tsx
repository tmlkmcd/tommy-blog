import * as React from "react";
import { useNavigate, useRouteLoaderData } from "react-router";
import type { Banner, ExtendedBlogPost } from "~/data/contentful/types";
import classNames from "classnames";
import { isCdnBanner, useBannerContent } from "~/hooks/useBannerContent";
import { useModal } from "~/components/Modal";
import { Confirm, CONFIRM_MODAL_TAG } from "~/components/Confirm";

type Fading = "in" | "out" | null;

export const PageBanner: React.FC = () => {
  const blogPost = useRouteLoaderData("routes/blog.post.$slug._index") as
    | ExtendedBlogPost
    | undefined;

  const navigate = useNavigate();

  const component: string | null = React.useMemo(() => {
    if (blogPost) {
      const { bannerImages } = blogPost;
      try {
        return bannerImages.fields.fullBannerImage.fields.file.url ?? null;
      } catch (e) {
        return null;
      }
    }

    return null;
  }, [blogPost]);

  const { currentBanner } = useBannerContent({
    switchTimeout: 60000,
    showingSomethingElse: !!component,
  });

  const [banner, setBanner] = React.useState<Banner | string | null>(
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

  const { addModal } = useModal();

  const onClick = (banner: Banner) => {
    if (!banner.link) {
      console.warn("Banner without link:", banner);
      return;
    }

    const { link } = banner;

    if (banner.isInternal) {
      navigate(link);
      return;
    }

    addModal({
      element: (
        <Confirm
          headerText="Navigating away"
          onConfirm={() => (window.location.href = link)}
          bodyText="This link will take you to another site!"
        />
      ),
      tag: CONFIRM_MODAL_TAG,
    });
  };

  return (
    <section
      className={classNames("fade-btm flex h-40 grow lg:h-60 [&>*]:flex-1", {
        "animate-fade-in": fading === "in",
        "animate-fade-out": fading === "out",
      })}
    >
      {(() => {
        if (isCdnBanner(banner)) {
          return (
            <BannerComponent
              {...banner}
              onClick={() => onClick(banner)}
              image={banner.images[0].fields.file.url}
              darken
            />
          );
        }

        return typeof banner === "string" ? (
          <BannerComponent image={banner} />
        ) : null;
      })()}
    </section>
  );
};

interface BannerComponentProps extends Partial<Banner> {
  darken?: boolean;
  image: string;
  onClick?: () => void;
}

function BannerComponent(props: BannerComponentProps) {
  const { onClick } = props || {};

  return onClick ? (
    <button onClick={onClick} className="relative">
      <InnerBannerComponent {...props} />
    </button>
  ) : (
    <div className="relative">
      <InnerBannerComponent {...props} />
    </div>
  );
}

function InnerBannerComponent(props: BannerComponentProps) {
  const { header, subtitle, image, imageAlignment, darken } = props || {};
  return (
    <>
      <div
        className={classNames(
          "inset-0 h-full w-full bg-cover",
          imageAlignment === "Top" && "bg-top",
          imageAlignment === "Bottom" && "bg-bottom",
          imageAlignment === "Left" && "bg-left",
          imageAlignment === "Right" && "bg-right",
          !imageAlignment && "bg-center"
        )}
        style={{ backgroundImage: `url(${image})` }}
      />
      {darken && <div className="absolute inset-0 bg-black opacity-40" />}
      <div className="absolute inset-0 ml-auto mr-0 p-4 opacity-50 lg:max-w-[50%]">
        {header && (
          <div className="text-xl font-bold text-pasta-200">{header}</div>
        )}
        {subtitle && <div className="text-md text-pasta-400">{subtitle}</div>}
      </div>
    </>
  );
}
