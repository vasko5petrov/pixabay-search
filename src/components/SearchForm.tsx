import { useContext } from "react";
import { Input } from "antd";
import type { GetProps } from "antd";
import { SearchContext } from "./providers/SearchContextProvider";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const SearchForm = () => {
  const { handleSearch } = useContext(SearchContext);

  const onSearch: SearchProps["onSearch"] = (value) => {
    handleSearch(value);
  };

  return (
    <Search
      placeholder="Search for images..."
      allowClear
      enterButton="Go"
      size="large"
      onSearch={onSearch}
      className="search-input"
    />
  );
};

export default SearchForm;
