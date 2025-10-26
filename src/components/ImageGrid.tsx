import { useContext } from "react";
import ImageCard from "./ImageCard";
import { SearchContext } from "./providers/SearchContextProvider";
import WelcomeScreen from "./WelcomeScreen";
import EmptyResults from "./EmptyResults";

const ImageGrid = () => {
  const { searchResults, searchTerm } = useContext(SearchContext);

  if (searchResults.length === 0) {
    return searchTerm === "" ? <WelcomeScreen /> : <EmptyResults />;
  }

  return (
    <div className="image-grid">
      {searchResults.map((image) => (
        <ImageCard image={image} key={image.id} />
      ))}
    </div>
  );
};

export default ImageGrid;
