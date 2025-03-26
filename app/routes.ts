import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("about/faq", "routes/about.faq._index.tsx"),
  route("about/skills", "routes/about.skills._index.tsx"),
  route("about/ttaal", "routes/about.ttaal._index.tsx"),
  route("blog", "routes/blog._index.tsx"),
  route("blog/footnotes/:ids", "routes/blog.footnotes.$ids._index.ts"),
  route("blog/link/:id", "routes/blog.link.$id._index.ts"),
  route("blog/post/:slug", "routes/blog.post.$slug._index.tsx"),
  route("blog/series/:slug", "routes/blog.series.$slug._index.tsx"),
  route("blog/series", "routes/blog.series._index.tsx"),
  route("blog/tags/:tag", "routes/blog.tags.$tag._index.tsx"),
  route("blog/tags", "routes/blog.tags._index.tsx"),
  route("contact", "routes/contact._index.tsx"),
  route("music", "routes/music.tsx"),
  route("music/:band", "routes/music.$band._index.tsx"),
  route("tech", "routes/tech._index.tsx"),
  route("tech/error-correction", "routes/tech.error-correction._index.tsx"),
  route("tech/turing-machine", "routes/tech.turing-machine._index.tsx"),
  route(
    "tech/use-draggable-field",
    "routes/tech.use-draggable-field._index.tsx",
  ),
] satisfies RouteConfig;
