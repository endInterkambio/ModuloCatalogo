import { Card, Col, Container, Row } from "react-bootstrap";
import { BookCardContentProps } from "@components/BookCardContent";
import { type Book } from "@/data/booksData";
import { useBookStore } from "@/stores/useBookStore";

type BookPageProps = {
  books: Book[];
};

// BookPage component displays a grid of book cards
// It receives an array of books and renders them in a responsive grid layout
function BookPage({ books }: BookPageProps) {
  // Get selected books and toggle function from the book store
  const selectedBooks = useBookStore((state) => state.selectedBooks);
  const toggleBook = useBookStore((state) => state.toggleBook);

  // Handle case when no books are available
  if (books.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h2>No hay libros disponibles con los filtros seleccionados</h2>
      </Container>
    );
  }

  // Render books in a responsive grid layout
  return (
      <Row>
        {books.map((book: Book) => {
          // Check if current book is selected
          const isSelected = selectedBooks.some((b) => b.SKU === book.SKU);
          return (
            <Col key={book.SKU} xs={12} sm={6} md={6} xxl={4} className="p-3 pt-sm-0">
              <Card className="d-flex flex-row" style={{ height: "300px"}}>
                {/* Render BookCardContent component with book data and selection state */}
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
  );
}

export default BookPage;
