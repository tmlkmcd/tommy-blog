import * as React from "react";
import { Outlet } from "@remix-run/react";

export const Body: React.FC = () => (
  <main>
    <div className="bg-pinkApotheosis-50 bg-opacity-30 py-4 px-8 text-left lg:px-12">
      <Outlet />
    </div>
  </main>
);
