// Import necessary components and icons
import { MdCheckCircle } from "react-icons/md";
import { type Book } from "@/data/booksData";
import imagePlaceholder from "@/assets/no-image.jpg";
import { Card } from "react-bootstrap";

// Interface defining the props for the book card component
interface BookCardContentProps {
  book: Book; // Book data to display
  onSelect: (book: Book) => void; // Callback to handle book selection
  isSelected: boolean; // Whether the book is currently selected
}

// Book card component that displays book information and selection state
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
      {/* Book image with error handling */}
      <Card.Img
        variant="top"
        src={book.ImageUrl}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = imagePlaceholder;
        }}
        className="flex-shrink-0 card-image"
      />
      {/* Selection indicator - green check circle in a yellow circle */}
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
      {/* Book information content */}
      <Card.Body className="d-flex flex-column flex-grow-1">
        <div className="pb-4">
          {/* Book title with truncation */}
          <Card.Title className="fw-bold text-ellipsis">{book.ItemName}</Card.Title>
          {/* Book author with truncation */}
          <Card.Subtitle className="text-ellipsis">{book.Author}</Card.Subtitle>
          {/* Book publisher */}
          <Card.Text>{book.Publisher}</Card.Text>
          {/* Book ISBN */}
          <Card.Text className="text-muted">ISBN: {book.ISBN}</Card.Text>
          {/* Book stock information */}
          <Card.Text
            className={`fw-bold${book.StockOnHand <= 0 ? "text-danger" : ""}`}
          >
            {book.StockOnHand <= 0 ? "Sin stock" : `Stock: ${book.StockOnHand}`}
          </Card.Text>
        </div>
        {/* Book price with currency symbol */}
        <Card.Footer className="mt-auto fw-bold text-center">
          S/.{book.SellingPrice.toFixed(2)}
        </Card.Footer>
      </Card.Body>
    </div>
  );
}
