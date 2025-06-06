import { useEffect, useState } from 'react';

export function usePagination(arr = [], itemPerPage = 10) {
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [arr]);

	const totalPages = Math.ceil(arr.length / itemPerPage); // Assuming there are 10 pages for simplicity

	const prev = () => setPage(page - 1);
	const next = () => setPage(page + 1);
	  const getPageRange = () => {
    const range = 2;
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    if (currentPage - range < 1) {
      end = Math.min(totalPages, end + (range - (currentPage - 1)));
    }
    if (currentPage + range > totalPages) {
      start = Math.max(1, start - (range - (totalPages - currentPage)));
    }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

	const content = arr.slice((page - 1) * itemPerPage, page * itemPerPage);
	// Assuming List is a component that takes care of rendering the items

	return { page, totalPages, prev, next,getPageRange, content, itemPerPage };
}
