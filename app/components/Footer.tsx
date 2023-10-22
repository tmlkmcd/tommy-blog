import * as React from "react";
import { OtherLinks } from "~/components/OtherLinks";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="space-y-4 border-t bg-pinkApotheosis-50 bg-opacity-60 px-8 py-4 text-left lg:px-12">
      <OtherLinks />
      <div>&copy; 2022-{currentYear} Thomas McDevitt.</div>
      <div>
        Apologies for how bare this site is. It's still under construction! 😬
      </div>
    </footer>
  );
};