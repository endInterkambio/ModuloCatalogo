import { Card, Col, Container, Row } from "react-bootstrap";
import { BookCardContentProps } from "@components/BookCardContent";
import { booksData } from "@/data/booksData";
import { type Books } from "data/booksData";

function BookPage() {
  return (
    <Container>
      <Row>
        {booksData.map((book: Books) => (
          <Col key={book.SKU} xs={12} sm={4} md={4} className="p-3">
            <Card className="d-flex flex-row" style={{ height: "300px" }}>
              <BookCardContentProps
                book={{
                  ...book,
                  id: book.SKU ?? "",
                  author: book.Author ?? "",
                  name: book.Name ?? "",
                  description: book.Description ?? "",
                  price: book.PreciodeVenta ?? 0,
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BookPage;
