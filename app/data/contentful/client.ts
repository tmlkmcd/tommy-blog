import contentful from "contentful";
import type { AxiosRequestConfig } from "axios";

export const contentfulClient = ({
  token,
  space,
  isPreview,
}: {
  token?: string | null;
  space?: string | null;
  isPreview?: boolean;
}): contentful.ContentfulClientApi => {
  if (!token || !space) {
    throw new Error("No access token and/or space provided!");
  }

  const host = isPreview ? "preview.contentful.com" : undefined;

  return contentful.createClient({
    space,
    accessToken: token,
    host,
    adapter: async (config: AxiosRequestConfig) => {
      const url = new URL(`${config.baseURL}/${config.url}`);
      if (config.params) {
        for (const key of Object.keys(config.params)) {
          url.searchParams.append(key, config.params[key]);
        }
      }

      const request = new Request(url.href, {
        method: config.method ? config.method.toUpperCase() : "GET",
        body: config.data,
        redirect: "manual",
        headers: config.headers
          ? (config.headers as Record<string, string>)
          : {},
      });

      const response = await fetch(request);

      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: config,
        request: request,
      };
    },
  });
};
