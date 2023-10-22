import { Layout } from "~/components/Layout";
import { useRootContext } from "~/RootContext";
import * as React from "react";
import { PageName } from "~/Pages";

export default function Index() {
  const { pushBreadcrumb } = useRootContext();

  React.useEffect(() => {
    pushBreadcrumb(PageName.Contact, true);
    document.title = "Contact Me - Tommy's Website";
    return () => {
      document.title = "Tommy's Website";
    };
  }, [pushBreadcrumb]);

  return (
    <Layout title="☎️ Contact">
      <div>
        Sorry! This page is still under construction. Or maybe I'm still
        deciding on my strategy for implementing a contact form...
      </div>
    </Layout>
  );
}
