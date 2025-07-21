// Import necessary components and hooks
import { useBookStore } from "@/stores/useBookStore";
import BookPage from "@/pages/BookPage";
import BookFilterSidebar from "@/components/BookFilterSideBar";
import { Container, Row, Col } from "react-bootstrap";
import SmartPagination from "@/components/SmartPagination";

// Define items per page constant
const ITEMS_PER_PAGE = 12;

// Main product listing page component
// This component manages the layout and pagination of books
const ProductListPage = () => {
  // Get necessary state from book store
  const { filteredBooks, currentPage, setCurrentPage } = useBookStore();

  // Calculate pagination values
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

  // Handle page change with validation
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container fluid>
      <Row style={{ minHeight: "100vh" }}>
        {/* Filter sidebar - visible on medium and larger screens */}
        <Col xs={12} md={3} lg={2} className="p-0">
          <BookFilterSidebar />
        </Col>
        
        {/* Main content area */}
        <Col xs={12} md={9} lg={10} className="p-4">
          {/* Book grid display */}
          <BookPage books={booksToDisplay} />

          {/* Pagination and results count - only show if more than one page */}
          {totalPages > 1 && (
            <>
              <SmartPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <div className="text-center mt-2">
                Mostrando {booksToDisplay.length} resultados
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
