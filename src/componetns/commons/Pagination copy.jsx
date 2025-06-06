import './Pagination.css';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaGithub } from "react-icons/fa";
import ResidentCard from './ResidentCard'; // Make sure this path is correct

function Pagination({ residents })  {
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPage = 6;

  const indexOfLastResident = currentPage * residentsPage;
  const indexOfFirstResident = indexOfLastResident - residentsPage;
  const currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

  const totalPages = Math.ceil(residents.length / residentsPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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

  const handleClick = () => {
    window.open("https://github.com/ValeTocar/RIckAndMortyApp", "_blank")
  };

  return (
    <>
      <div className="residents">
        {currentResidents.map((resident) => (
          <ResidentCard key={resident} url={resident} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className={`pagination_button ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={goPrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          {getPageRange().map((page) => (
            <button
              key={page}
              className={`pagination_button ${currentPage === page ? 'active' : ''}`}
              onClick={() => paginate(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={`pagination_button ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={goNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {residents.length === 0 && <h2 className="no-residents">No Residents found</h2>}
      <div className='container_button'>
        <button
          className='button_github'
          onClick={handleClick}
        >
          <FaGithub className='icongit' />GIT-HUB
        </button>
      </div>
    </>
  );
}

export default Pagination;
