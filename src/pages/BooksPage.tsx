
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BookCardContentProps } from "@components/BookCardContent";
import { booksData } from "@/data/booksData";
import { type Books } from "data/booksData";


function BookPage() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  return (
    <Container>
      <Row>
        {booksData.map((book: Books) => {
          const id = book.SKU ?? "";
          const isSelected = selectedCards.includes(id);
          return (
            <Col key={id} xs={12} sm={4} md={4} className="p-3">
              <Card
                className={`d-flex flex-row${isSelected ? " border-primary border-3" : ""}`}
                style={{ height: "300px" }}
              >
                <BookCardContentProps
                  book={{
                    ...book,
                    id,
                    author: book.Author ?? "",
                    name: book.Name ?? "",
                    description: book.Description ?? "",
                    price: book.PreciodeVenta ?? 0,
                    URL: book.URL ?? "",
                  }}
                  onSelect={handleSelect}
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
