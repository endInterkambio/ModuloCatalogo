// Import necessary components from react-bootstrap
import { Pagination } from "react-bootstrap";

// Interface defining the props for SmartPagination component
interface SmartPaginationProps {
  totalPages: number;        // Total number of pages available
  currentPage: number;        // Currently active page
  onPageChange: (page: number) => void;  // Callback function to handle page changes
}

// SmartPagination component implements a dynamic pagination UI
// It displays page numbers with ellipsis (...) for better navigation when there are many pages
const SmartPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: SmartPaginationProps) => {
  // Generate page numbers with ellipsis for better navigation
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    // Handle case when there are 7 or fewer pages
    // Show all page numbers directly
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Add ellipsis if current page is beyond the first 4 pages
      if (currentPage > 4) {
        pageNumbers.push("...");
      }

      // Calculate visible page range around current page
      // Always shows 3 pages around the current page (1 before, current, 1 after)
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      // Add pages in the visible range
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if current page is before the last 3 pages
      if (currentPage < totalPages - 3) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Render the pagination component with the calculated page numbers
  return (
    <Pagination className="custom-pagination d-flex justify-content-center flex-wrap">
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Pagination.Item
            key={index}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ) : (
          <Pagination.Ellipsis key={index} disabled />
        )
      )}

      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default SmartPagination;
