import React, { createContext, useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { useQuery } from "@tanstack/react-query";
import { buildImage, buildUrl } from "../../utils";
import type { SearchContextType } from "../../types";
import { defaultPage, FIVE_MINUTES, perPage } from "../../constants";

const defaultContextValue: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
  searchResults: [],
  totalHits: 0,
  handleSearch: () => {},
  isPending: false,
  error: null,
  setPage: () => {},
  page: defaultPage,
};

const SearchContext = createContext<SearchContextType>(defaultContextValue);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    SearchContextType["searchResults"]
  >([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(defaultPage);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchImages = useCallback(async () => {
    if (!searchTerm) return null;

    const url = buildUrl(searchTerm, perPage, page);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

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
      setSearchResults([]);
      setTotalHits(0);
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
