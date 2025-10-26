import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "./components/providers/SearchContextProvider";
import SearchForm from "./components/SearchForm";
import SearchMessage from "./components/SearchMessage";
import ImageGrid from "./components/ImageGrid";
import Pagination from "./components/Pagination";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <div className="app-container">
          <SearchForm />
          <SearchMessage />
          <ImageGrid />
          <Pagination />
        </div>
      </SearchContextProvider>
    </QueryClientProvider>
  );
};

export default App;
