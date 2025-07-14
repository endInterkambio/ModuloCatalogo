import { Card } from "react-bootstrap";

export type Book = {
  id: string;
  name: string;
  author: string;
  description: string;
  price: number;
};

interface BookCardContentProps {
  book: Book;
}

export function BookCardContentProps({ book }: BookCardContentProps) {
  return (
    <div className="d-flex flex-row">
      <Card.Img
        variant="top"
        src={`https://picsum.photos/seed/${book.id}/200/300`}
        className="flex-shrink-0"
        style={{ width: "200px", height: "300px" }}
      />
      <Card.Body className="d-flex flex-column flex-grow-1">
        <div className="pb-4">
          <Card.Title>{book.name}</Card.Title>
          <Card.Subtitle>{book.author}</Card.Subtitle>
          <Card.Text className="description">{book.description}</Card.Text>
        </div>
        <Card.Footer className="mt-auto">
          S/.{book.price.toFixed(2)}
        </Card.Footer>
      </Card.Body>
    </div>
  );
}
