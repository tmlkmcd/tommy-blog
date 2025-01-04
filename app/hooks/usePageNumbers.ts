import { useSearchParams } from "@remix-run/react";

export const usePageNumbers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const changePage = (page: number) => {
    let sanitisedPage = page < 1 ? 1 : page;
    sanitisedPage = Math.floor(sanitisedPage);
    searchParams.set("page", sanitisedPage.toString());
    setSearchParams(searchParams);
  };

  return {
    page,
    changePage,
  };
};
