import * as React from "react";
import type { ExtendedBlogPost } from "~/components/contentful/types";
import { formatBlogDate } from "~/data/dates";
import { Categories } from "~/components/contentful/Categories";
import { LinkWithQuery } from "~/components/LinkWithQuery";
import { useLocation, useNavigate } from "react-router";

interface Props {
  posts: ExtendedBlogPost[];
  showSeries?: boolean;
}

interface PostPreviewProps {
  post: ExtendedBlogPost;
  showSeries: boolean;
}

export const PostPreviewGrid: React.FC<Props> = ({
  posts,
  showSeries = true,
}) => {
  return (
    <section className="flex flex-col gap-2 sm:grid sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostPreview post={post} key={post.slug} showSeries={showSeries} />
      ))}
    </section>
  );
};

const PostPreview: React.FC<PostPreviewProps> = React.memo(
  function PostPreview({ post, showSeries }) {
    const { search } = useLocation();
    const navigate = useNavigate();
    const imgSrc: string | null = post.image?.fields.file.url;
    return (
      <button
        className="flex flex-col bg-nobel-400 bg-opacity-60 text-left transition-all hover:brightness-125"
        onClick={() => {
          navigate(`/blog/post/${post.slug}${search}`);
        }}
      >
        <section className="relative w-full">
          <div
            className="fade-btm absolute inset-0 w-full bg-cover opacity-50"
            style={{ backgroundImage: `url(${imgSrc})` }}
          />
          <div className="flex justify-center">
            {imgSrc && <img src={imgSrc} className="fade-btm" alt="" />}
          </div>
          <div className="fade-top absolute inset-x-0 bottom-0 flex grow flex-col bg-nobel-400 bg-opacity-60 px-2 pt-6">
            <header className="mx-1 flex items-center gap-1 border-b border-dashed border-nobel-700">
              {formatBlogDate(post.published)}
            </header>
          </div>
        </section>
        <div className="flex grow flex-col px-2 pb-2">
          <span className="pt-2 text-xl lg:text-2xl">{post.title}</span>
          <Categories categories={post.categories} />
          <span className="pt-2 text-sm md:text-base">{post.blurb}</span>
          {showSeries && post.series && (
            <span className="pt-2 text-sm">
              Part a series on{" "}
              <LinkWithQuery
                to={`/blog/series/${post.series.fields.slug}`}
                className="text-sapphireSplendour-700 underline transition hover:text-sapphireSplendour-300"
                onClick={(ev) => ev.stopPropagation()}
              >
                {post.series.fields.name}
              </LinkWithQuery>
              .
            </span>
          )}
        </div>
      </button>
    );
  }
);
