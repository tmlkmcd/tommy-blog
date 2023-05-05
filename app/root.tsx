import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import appleTouchIcon from "~/webpageIconography/apple-touch-icon.png";
import favicon16 from "~/webpageIconography/favicon-16x16.png";
import favicon32 from "~/webpageIconography/favicon-32x32.png";
import safariPinnedTab from "~/webpageIconography/safari-pinned-tab.svg";
import siteWebmanifest from "~/webpageIconography/site.webmanifest";

import stylesheet from "~/tailwind.css";
import { useTheme } from "~/hooks/useTheme";
import classNames from "classnames";
import { Header } from "~/components/Header";
import { Body } from "~/components/Body";
import { ModalProvider } from "~/components/Modal";
import type { ContentfulGenericItems } from "~/rootLoader";
import { RootProvider } from "~/RootContext";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIcon },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: favicon32,
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: favicon16,
  },
  { rel: "manifest", href: siteWebmanifest },
  { rel: "mask-icon", href: safariPinnedTab, color: "#5bbad5" },
];

export { loader } from "./rootLoader";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Tommy's Website",
  viewport: "width=device-width,initial-scale=1",
  "msapplication-TileColor": "#da532c",
  "theme-color": "#ffffff",
});

export default function App() {
  const cfGeneric = useLoaderData() as ContentfulGenericItems;

  const { theme } = useTheme();

  return (
    <html lang="en">
      <RootProvider {...cfGeneric}>
        <head>
          <Meta />
          <Links />
          <title>Tommy's Website</title>
        </head>
        <body
          className={classNames(
            "min-h-screen bg-cover bg-fixed bg-center bg-no-repeat text-center text-center font-aleo md:h-auto md:bg-page",
            theme
          )}
        >
          <ModalProvider>
            <div
              className={classNames(
                "rounded border border-black backdrop-blur-sm md:mx-auto md:max-w-2xl lg:my-8 lg:w-[95%] lg:max-w-6xl",
                "h-full md:m-4 md:h-auto md:shadow-main"
              )}
            >
              <Header />
              <Body />
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
