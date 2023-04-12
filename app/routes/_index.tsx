import * as React from "react";
import { Navigate } from "react-router";

export default function Index() {
  return <Navigate to={"/blog"} />;
}
