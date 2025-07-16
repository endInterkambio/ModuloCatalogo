import BookPage from "@/pages/BookPage";
import { useEffect, useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { type SingleValue } from "react-select";
import { booksData } from "@/data/booksData";
import { filterBooks } from "@/utils/filterBooks";
import BookFilterSidebar from "./BookFilterSideBar";

const ProductListPage = () => {
  const [books, setBooks] = useState(booksData);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedPrice, setSelectedPrice] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [selectedStock, setSelectedStock] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [selectedShelf, setSelectedShelf] =
    useState<SingleValue<{ value: number; label: string }>>(null);
  const [selectedFloor, setSelectedFloor] =
    useState<SingleValue<{ value: number; label: string }>>(null);

  useEffect(() => {
    const filteredBooks = filterBooks({
      data: booksData,
      sortOrder,
      selectedPrice,
      selectedStock,
      selectedShelf,
      selectedFloor,
    });
    setBooks(filteredBooks);
  }, [sortOrder, selectedPrice, selectedStock, selectedShelf, selectedFloor]);

  return (
    <Container fluid>
      <Row style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Col xs={12} md={3} lg={2} className="p-0">
          <BookFilterSidebar
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
            selectedShelf={selectedShelf}
            setSelectedShelf={setSelectedShelf}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
          />
        </Col>

        {/* Contenido principal */}
        <Col xs={12} md={9} lg={10} className="p-4">
          <BookPage books={books} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
