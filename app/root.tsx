import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { useTheme } from "~/hooks/useTheme";
import classNames from "classnames";
import { Header } from "~/components/Header";
import { Body } from "~/components/Body";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { theme } = useTheme();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>Tommy's Website</title>
      </head>
      <body
        className={classNames(
          "h-screen bg-cover bg-fixed bg-center bg-no-repeat text-center font-andika md:bg-page",
          theme
        )}
      >
        <div
          className={classNames(
            "rounded border border-black backdrop-blur-sm md:my-8 md:mx-auto md:max-w-2xl lg:max-w-6xl",
            "h-full md:m-4 md:h-auto md:shadow-main"
          )}
        >
          <Header />
          <Body />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
