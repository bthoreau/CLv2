import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => Promise<void> | void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-white border border-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      
      {pages[0] > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-primary text-white'
                : 'bg-white border border-gray-300'
            }`}
          >
            1
          </button>
          {pages[0] > 2 && <span className="px-4 py-2">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-md ${
            currentPage === page
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
      
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="px-4 py-2">...</span>}
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-primary text-white'
                : 'bg-white border border-gray-300'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-white border border-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}