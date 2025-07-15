import { Card, Col, Container, Row } from "react-bootstrap";
import { BookCardContentProps } from "@components/BookCardContent";
import { type Book } from "data/booksData";
import { useBookStore } from "@/stores/useBookStore";

type BookPageProps = {
  books: Book[];
};

function BookPage({ books }: BookPageProps) {
  const selectedBooks = useBookStore((state) => state.selectedBooks);
  const toggleBook = useBookStore((state) => state.toggleBook);

  if (books.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h2>No hay libros disponibles con los filtros seleccionados</h2>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {books.map((book: Book) => {
          const isSelected = selectedBooks.some((b) => b.SKU === book.SKU);
          return (
            <Col key={book.SKU} xs={12} sm={4} md={4} className="p-3">
              <Card className="d-flex flex-row" style={{ height: "300px" }}>
                <BookCardContentProps
                  book={book}
                  onSelect={toggleBook}
                  isSelected={isSelected}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default BookPage;
