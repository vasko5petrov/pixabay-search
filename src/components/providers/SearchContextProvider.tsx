import React, { createContext, useState, useEffect } from "react";
import { message } from "antd";
import { useQuery } from "@tanstack/react-query";
import { buildImage, buildUrl } from "../../utils";
import type { SearchContextType } from "../../types";

const SearchContext = createContext<SearchContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
  searchResults: [],
  totalHits: 0,
  handleSearch: () => {},
  isPending: false,
  error: null,
});

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    SearchContextType["searchResults"]
  >([]);
  const [totalHits, setTotalHits] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchImages = async () => {
    if (!searchTerm) return null;

    const url = buildUrl(searchTerm);
    const response = await fetch(url);

    return response.json();
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: fetchImages,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (!data) return;

    const images = data.hits.map(buildImage);
    setSearchResults(images);
    setTotalHits(data.total);
  }, [data]);

  useEffect(() => {
    if (!error) return;

    messageApi.open({
      type: "error",
      content: error.message,
      duration: 4000,
    });
  }, [error]);

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
      }}
    >
      {contextHolder}
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
