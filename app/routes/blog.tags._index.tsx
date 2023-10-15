import * as React from "react";
import { useRootContext } from "~/RootContext";
import { Layout } from "~/components/Layout";
import { PageName } from "~/Pages";
import { GeneralPreviewGrid } from "~/components/contentful/PostPreviewGrid";

export default function Index() {
  const { pushBreadcrumb, categories } = useRootContext();

  React.useEffect(() => {
    pushBreadcrumb(PageName.Tags);
    document.title = "Tags - Tommy's Blog";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  const items = categories.map(({ name, id, image }) => ({
    title: name,
    imgSrc: image?.fields.file.url ?? null,
    target: `/blog/tags/${name.toLowerCase()}`,
    id,
  }));

  return (
    <Layout title="Tags" subtitle={<div>Blog post categories</div>}>
      <GeneralPreviewGrid items={items} />
    </Layout>
  );
}
