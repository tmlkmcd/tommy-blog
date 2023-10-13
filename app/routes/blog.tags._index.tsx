import * as React from "react";
import { useRootContext } from "~/RootContext";
import { Layout } from "~/components/Layout";
import { PageName } from "~/Pages";
import { GeneralPreviewGrid } from "~/components/contentful/PostPreviewGrid";

export default function Index() {
  const { pushBreadcrumb, categories } = useRootContext();
  const [animating, setAnimating] = React.useState<number>(0);

  React.useEffect(() => {
    pushBreadcrumb(PageName.Tags);
    document.title = "Tags - Tommy's Blog";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  React.useEffect(() => {
    if (animating === 0) {
      setTimeout(() => {
        setAnimating(1);
      }, 500);
      return;
    }

    if (animating < categories.length) {
      setTimeout(() => {
        setAnimating((prev) => prev + 1);
      }, 120);
    }
  }, [animating, categories.length]);

  const items = categories.map(({ name, id, image }) => ({
    title: name,
    imgSrc: image?.fields.file.url ?? null,
    target: `/blog/tags/${name.toLowerCase()}`,
    id,
  }));

  return (
    <Layout title="Tags">
      <GeneralPreviewGrid items={items} />
    </Layout>
  );
}
