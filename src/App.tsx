import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchForm from "./components/SearchForm";
import SearchMessage from "./components/SearchMessage";
import ImageGrid from "./components/ImageGrid";
import { SearchContextProvider } from "./components/providers/SearchContextProvider.tsx";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <div className="app-container">
          <SearchForm />
          <SearchMessage />
          <ImageGrid />
        </div>
      </SearchContextProvider>
    </QueryClientProvider>
  );
};

export default App;
