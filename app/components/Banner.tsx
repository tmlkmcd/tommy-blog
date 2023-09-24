import * as React from "react";
import { useRouteLoaderData } from "react-router";
import { ExtendedBlogPost } from "~/components/contentful/types";
import classNames from "classnames";

type BannerComponent = null | {
  type: "blogPost";
  image: string;
};

export const Banner: React.FC = () => {
  const blogPost = useRouteLoaderData("routes/blog.post.$slug._index") as
    | ExtendedBlogPost
    | undefined;

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

  if (blogPost) {
    const { bannerImage } = blogPost;
    const imgSrc: string | null = bannerImage?.fields.file.url;

    return (
      <Wrapper
        className="fade-btm inset-0 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imgSrc})` }}
      />
    );
  }

  return <Wrapper>content</Wrapper>;
};

const Wrapper: React.FC<
  React.PropsWithChildren<
    React.HTMLProps<HTMLDivElement> & { className?: string }
  >
> = ({ children, className, ...props }) => {
  return (
    <section className={classNames("h-40 grow lg:h-60", className)} {...props}>
      {children}
    </section>
  );
};
