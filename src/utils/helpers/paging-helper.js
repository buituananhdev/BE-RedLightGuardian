export default (page, pageSize, totalRecords) => {
  const totalPages = Math.ceil(totalRecords / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    currentPage: page,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};
