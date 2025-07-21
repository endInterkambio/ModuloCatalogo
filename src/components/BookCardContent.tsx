import { Card } from "react-bootstrap";
import { MdCheckCircle } from "react-icons/md";
import { type Book } from "@/data/booksData";
import imagePlaceholder from "@/assets/no-image.jpg";

interface BookCardContentProps {
  book: Book;
  onSelect: (book: Book) => void;
  isSelected: boolean;
}

export function BookCardContentProps({
  book,
  onSelect,
  isSelected,
}: BookCardContentProps) {
  return (
    <div
      className={`d-flex flex-row clickable${isSelected ? " selected" : ""}`}
      style={{
        cursor: "pointer",
        position: "relative",
        background: isSelected ? "#e3f2fd" : undefined,
        width: "100%",
      }}
      onClick={() => onSelect(book)}
    >
      <Card.Img
        variant="top"
        src={book.ImageUrl}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = imagePlaceholder;
        }}
        className="flex-shrink-0 card-image"
      />
      {isSelected && (
        <MdCheckCircle
          size={32}
          color="#00ab55"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "#fed700",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />
      )}
      <Card.Body className="d-flex flex-column flex-grow-1">
        <div className="pb-4">
          <Card.Title className="fw-bold text-ellipsis">{book.ItemName}</Card.Title>
          <Card.Subtitle className="text-ellipsis">{book.Author}</Card.Subtitle>
          <Card.Text>{book.Publisher}</Card.Text>
          <Card.Text className="text-muted">ISBN: {book.ISBN}</Card.Text>
          <Card.Text
            className={`fw-bold${book.StockOnHand <= 0 ? "text-danger" : ""}`}
          >
            {book.StockOnHand <= 0 ? "Sin stock" : `Stock: ${book.StockOnHand}`}
          </Card.Text>
        </div>
        <Card.Footer className="mt-auto fw-bold text-center">
          S/.{book.SellingPrice.toFixed(2)}
        </Card.Footer>
      </Card.Body>
    </div>
  );
}
