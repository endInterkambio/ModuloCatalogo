import { Card } from "react-bootstrap";

export type Book = {
  id: string;
  name: string;
  author: string;
  description: string;
  price: number;
  URL: string; // URL for the book cover image
};

interface BookCardContentProps {
  book: Book;
}

export function BookCardContentProps({ book }: BookCardContentProps) {
  return (
    <div className="d-flex flex-row">
      <Card.Img
        variant="top"
        src={book.URL}
        onError={(e) => {
          e.currentTarget.onerror = null; // Prevent infinite loop 
          e.currentTarget.src = "https://placeholder.pics/svg/200x300/DEDEDE/555555/Book"; 
        }}
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
