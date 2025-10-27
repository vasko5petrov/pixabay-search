import React, { createContext, useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { useQuery } from "@tanstack/react-query";
import { buildImage, buildUrl } from "../../utils";
import type { SearchContextType } from "../../types";
import { defaultPage, FIVE_MINUTES, perPage } from "../../constants";

const defaultContextValue: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
  searchResults: null,
  totalHits: 0,
  handleSearch: () => {},
  isPending: false,
  error: null,
  setPage: () => {},
  page: defaultPage,
};

const SearchContext = createContext<SearchContextType>(defaultContextValue);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState(defaultContextValue.searchTerm);
  const [searchResults, setSearchResults] = useState<
    SearchContextType["searchResults"]
  >(defaultContextValue.searchResults);
  const [totalHits, setTotalHits] = useState(defaultContextValue.totalHits);
  const [page, setPage] = useState(defaultPage);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchImages = useCallback(async () => {
    if (!searchTerm) return null;

    const url = buildUrl(searchTerm, perPage, page);
    const response = await fetch(url);

    return response.json();
  }, [searchTerm, page]);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["images", searchTerm, page],
    queryFn: fetchImages,
    enabled: false,
    staleTime: FIVE_MINUTES,
  });

  const handleSearch = useCallback(
    (value: string) => {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        messageApi.open({
          type: "info",
          content: "Please enter a search term",
          duration: 2,
        });
        return;
      }

      setSearchTerm(trimmedValue);
      setPage(defaultPage);
    },
    [messageApi]
  );

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(defaultContextValue.searchResults);
      setTotalHits(defaultContextValue.totalHits);
      return;
    }

    refetch();
  }, [searchTerm, page, refetch]);

  useEffect(() => {
    if (!data?.hits) return;

    const images = data.hits.map(buildImage);
    setSearchResults(images);
    setTotalHits(data.totalHits);
  }, [data]);

  useEffect(() => {
    if (!error) return;

    messageApi.open({
      type: "error",
      content: error.message || "An error occurred while fetching images",
      duration: 4,
    });
  }, [error, messageApi]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        totalHits,
        handleSearch,
        isPending,
        error,
        setPage,
        page,
      }}
    >
      {contextHolder}
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
