import { useContext } from "react";
import { SearchContext } from "./providers/SearchContextProvider";

const SearchMessage = () => {
  const { searchResults, searchTerm, totalHits } = useContext(SearchContext);

  if (searchResults.length === 0) return null;

  return (
    <p>
      Showing {searchResults.length} of {totalHits} results for {searchTerm}
    </p>
  );
};

export default SearchMessage;
