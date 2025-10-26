import React, { useContext } from "react";
import { Pagination as AntdPagination } from "antd";
import { SearchContext } from "./providers/SearchContextProvider";
import { defaultPage, perPage } from "../constants";

const Pagination = () => {
  const { totalHits, setPage, page } = useContext(SearchContext);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalHits === 0) return null;

  return (
    <AntdPagination
      responsive
      align="center"
      defaultCurrent={defaultPage}
      total={totalHits}
      pageSize={perPage}
      current={page}
      onChange={handlePageChange}
      showSizeChanger={false}
    />
  );
};

export default Pagination;
