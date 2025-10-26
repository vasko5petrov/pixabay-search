import React, { useContext } from "react";
import ImageCard from "./ImageCard";
import { SearchContext } from "./providers/SearchContextProvider";

const ImageGrid = () => {
  const { searchResults } = useContext(SearchContext);

  return (
    <div className="image-grid">
      {searchResults.map((image) => (
        <ImageCard image={image} key={image.id} />
      ))}
    </div>
  );
};

export default ImageGrid;
