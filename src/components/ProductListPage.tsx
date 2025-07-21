import { useBookStore } from "@/stores/useBookStore";
import BookPage from "@/pages/BookPage";
import BookFilterSidebar from "./BookFilterSideBar";
import { Container, Row, Col} from "react-bootstrap";
import SmartPagination from "./SmartPagination";

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
