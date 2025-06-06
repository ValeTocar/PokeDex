import { useEffect, useState } from 'react';

export function usePagination(arr = [], itemPerPage = 10) {
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [arr]);

	const totalPages = Math.ceil(arr.length / itemPerPage); // Assuming there are 10 pages for simplicity

	const prev = () => setPage(page - 1);
	const next = () => setPage(page + 1);
	

	const content = arr.slice((page - 1) * itemPerPage, page * itemPerPage);
	// Assuming List is a component that takes care of rendering the items

	return { page, totalPages, prev, next, content, itemPerPage };
}
