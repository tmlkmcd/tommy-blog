import * as React from "react";
import { Outlet } from "@remix-run/react";

export const Body: React.FC = () => (
  <main className="bg-pinkApotheosis-50 bg-opacity-60 px-8 pb-4 text-left lg:px-12">
    <Outlet />
  </main>
);
