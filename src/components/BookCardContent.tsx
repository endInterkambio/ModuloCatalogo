import { Card } from "react-bootstrap";
import { MdCheckCircle } from "react-icons/md";

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
  onSelect: (id: string) => void;
  isSelected: boolean;
}


export function BookCardContentProps({ book, onSelect, isSelected }: BookCardContentProps) {
  return (
    <div
      className={`d-flex flex-row clickable${isSelected ? " selected" : ""}`}
      style={{ cursor: "pointer", position: "relative", background: isSelected ? "#e3f2fd" : undefined }}
      onClick={() => onSelect(book.id)}
    >
      <Card.Img
        variant="top"
        src={book.URL}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://placeholder.pics/svg/200x300/DEDEDE/555555/Book";
        }}
        className="flex-shrink-0"
        style={{ width: "200px", height: "100%", objectFit: "cover" }}
      />
      {isSelected && (
        <MdCheckCircle
          size={32}
          color="#2196f3"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "white",
            borderRadius: "50%",
            zIndex: 2
          }}
        />
      )}
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
