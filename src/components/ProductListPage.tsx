import { useBookStore } from "@/stores/useBookStore";
import { booksData } from "@/data/booksData";
import { filterBooks } from "@/utils/filterBooks";
import BookPage from "@/pages/BookPage";
import BookFilterSidebar from "./BookFilterSideBar";
import { Container, Row, Col } from "react-bootstrap";

const ProductListPage = () => {
  const {
    sortOrder,
    selectedPrice,
    selectedStock,
    selectedShelf,
    selectedFloor,
    searchTerm,
  } = useBookStore();

  const filteredBooks = filterBooks({
    data: booksData,
    sortOrder,
    selectedPrice,
    selectedStock,
    selectedShelf,
    selectedFloor,
    searchTerm,
  });

  return (
    <Container fluid>
      <Row style={{ minHeight: "100vh" }}>
        <Col xs={12} md={3} lg={2} className="p-0">
          <BookFilterSidebar />
        </Col>
        <Col xs={12} md={9} lg={10} className="p-4">
          <BookPage books={filteredBooks} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
