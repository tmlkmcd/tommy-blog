import * as React from "react";
import { Outlet } from "react-router";

export const Body: React.FC = () => (
  <main className="bg-pinkApotheosis-50 bg-opacity-90 px-8 pb-4 text-left lg:px-12">
    <Outlet />
  </main>
);
