import type { LinksFunction, V2_MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import appleTouchIcon from "~/webpageIconography/apple-touch-icon.png";
import favicon48 from "~/webpageIconography/favicon-48x48.png";
import siteWebmanifest from "~/webpageIconography/site.webmanifest";

import stylesheet from "~/tailwind.css";
import { useTheme } from "~/hooks/useTheme";
import classNames from "classnames";
import { Header } from "~/components/Header";
import { Body } from "~/components/Body";
import { ModalProvider } from "~/components/Modal";
import type { ContentfulGenericItems } from "~/rootLoader";
import { RootProvider } from "~/RootContext";
import { Footer } from "~/components/Footer";
import { useLocation } from "react-router";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIcon },
  {
    rel: "icon",
    type: "image/png",
    sizes: "48x48",
    href: favicon48,
  },
  { rel: "manifest", href: siteWebmanifest },
];

export { loader } from "./rootLoader";

export const meta: V2_MetaFunction = () => [
  {
    charset: "utf-8",
  },
  { title: "Tommy's Website" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { name: "msapplication-tilecolor", content: "#da532c" },
  { name: "theme-color", content: "#ffffff" },
];

export default function App() {
  const cfGeneric = useLoaderData() as ContentfulGenericItems;

  const { theme } = useTheme();
  return (
    <html lang="en" className="scrollbar-thin">
      <RootProvider {...cfGeneric}>
        <head>
          <Meta />
          <Links />
          <title>Tommy's Website</title>
        </head>
        <body
          className={classNames(
            "min-h-full w-full bg-page bg-cover bg-fixed bg-center bg-no-repeat text-center font-aleo text-nobel-950 md:h-auto md:py-8",
            theme
          )}
        >
          <ModalProvider>
            <div
              className={classNames(
                "rounded border border-black backdrop-blur-sm md:mx-auto md:max-w-2xl lg:w-[95%] lg:max-w-6xl",
                "h-full md:h-auto md:shadow-main"
              )}
            >
              <Header />
              <Body />
              <Footer />
            </div>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
            <div id="modal-root" />
          </ModalProvider>
        </body>
      </RootProvider>
    </html>
  );
}
