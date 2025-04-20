import { useState } from "react";

const usePagination = (items, pageSize) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    totalItems: items.length
  };
};
export default usePagination;