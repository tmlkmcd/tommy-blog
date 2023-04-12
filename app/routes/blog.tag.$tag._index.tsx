import * as React from "react";
import { useParams } from "react-router";
import { Layout } from "~/components/Layout";

interface Props {}

export default function Index() {
  const { tag } = useParams<{ tag: string }>();
  return <Layout title={"asd"}></Layout>;
}
