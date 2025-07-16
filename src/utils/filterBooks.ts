import type { Book } from "@/data/booksData";
import type { SingleValue } from "react-select";

export function filterBooks({
  data,
  sortOrder,
  selectedPrice,
  selectedStock,
  selectedShelf,
  selectedFloor,
}: {
  data: Book[];
  sortOrder: string;
  selectedPrice: SingleValue<{ value: string; label: string }>;
  selectedStock: SingleValue<{ value: string; label: string }>;
  selectedShelf: SingleValue<{ value: number; label: string }>;
  selectedFloor: SingleValue<{ value: number; label: string }>;
}): Book[] {
  let filtered = [...data];

  // Filtro por precio
  if (selectedPrice) {
    const [min, max] = selectedPrice.value.includes("+")
      ? [parseInt(selectedPrice.value), Infinity]
      : selectedPrice.value.split("-").map(Number);
    filtered = filtered.filter(
      (book) => book.PreciodeVenta >= min && book.PreciodeVenta <= max
    );
  }

  // Filtro por stock
  if (selectedStock) {
    const value = selectedStock.value;
    if (value === "0") {
      filtered = filtered.filter((book) => book.StockonHand === 0);
    } else {
      const [min, max] = selectedStock.value.includes("+")
        ? [parseInt(selectedStock.value), Infinity]
        : selectedStock.value.split("-").map(Number);
      filtered = filtered.filter(
        (book) => book.StockonHand >= min && book.StockonHand <= max
      );
    }
  }

  // Filtro por estante
  if (selectedShelf) {
    filtered = filtered.filter((book) => book.BookCase === selectedShelf.value);
  }

  // Filtro por piso
  if (selectedFloor) {
    filtered = filtered.filter(
      (book) => book.BookCaseFloor === selectedFloor.value
    );
  }

  // Orden alfabético
  if (sortOrder === "A-Z") {
    filtered.sort((a, b) => (a.Name || "").localeCompare(b.Name || ""));
  } else if (sortOrder === "Z-A") {
    filtered.sort((a, b) => (b.Name || "").localeCompare(a.Name || ""));
  }

  return filtered;
}
