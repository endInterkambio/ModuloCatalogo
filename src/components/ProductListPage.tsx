import { useBookStore } from "@/stores/useBookStore";
import BookPage from "@/pages/BookPage";
import BookFilterSidebar from "./BookFilterSideBar";
import { Container, Row, Col, Pagination } from "react-bootstrap";

const ITEMS_PER_PAGE = 12;

const ProductListPage = () => {
  const { filteredBooks, currentPage, setCurrentPage } = useBookStore();

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container fluid>
      <Row style={{ minHeight: "100vh" }}>
        <Col xs={12} md={3} lg={2} className="p-0">
          <BookFilterSidebar />
        </Col>
        <Col xs={12} md={9} lg={10} className="p-4">
          <BookPage books={booksToDisplay} />

          {totalPages > 1 && (
            <Pagination className="custom-pagination mt-4 d-flex justify-content-center flex-wrap">
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <Pagination.Item
                    key={page}
                    className="custom-page-item"
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                );
              })}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
              <div className="text-center my-auto px-3">
                <span>Mostrando {booksToDisplay.length} resultados</span>
              </div>
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
