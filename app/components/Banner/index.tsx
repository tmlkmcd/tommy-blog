import * as React from "react";
import { useRouteLoaderData } from "react-router";
import { ExtendedBlogPost } from "~/components/contentful/types";
import classNames from "classnames";
import { useBannerContent } from "~/hooks/useBannerContent";
import { SnaxBanner } from "~/components/Banner/SnaxBanner";

type BannerComponent = null | {
  type: "blogPost";
  image: string;
};

export const Banner: React.FC = () => {
  const blogPost = useRouteLoaderData("routes/blog.post.$slug._index") as
    | ExtendedBlogPost
    | undefined;

  const { currentBanner } = useBannerContent({ switchTimeout: 15000 });

  const component: BannerComponent | null = React.useMemo(() => {
    if (blogPost) {
      const { bannerImage } = blogPost;
      const image: string | null = bannerImage?.fields.file.url;
      if (!image) return null;

      return {
        type: "blogPost",
        image,
      };
    }

    return null;
  }, [blogPost]);

  React.useEffect(() => {});

  if (component) {
    return (
      <Wrapper
        className="inset-0 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${component.image})` }}
      />
    );
  }

  return (
    <Wrapper>
      {(() => {
        switch (currentBanner) {
          default:
            return <SnaxBanner />;
        }
      })()}
    </Wrapper>
  );
};

const Wrapper: React.FC<
  React.PropsWithChildren<
    React.HTMLProps<HTMLDivElement> & { className?: string }
  >
> = ({ children, className, ...props }) => {
  return (
    <section
      className={classNames(
        "fade-btm flex h-40 grow lg:h-60 [&>*]:flex-1",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
