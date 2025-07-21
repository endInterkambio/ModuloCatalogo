import type { Book } from "@/data/booksData";
import type { SingleValue } from "react-select";

export function filterBooks({
  data,
  sortOrder,
  selectedPrice,
  selectedStock,
  selectedShelf,
  selectedFloor,
  searchTerm,
}: {
  data: Book[];
  sortOrder: string;
  selectedPrice: SingleValue<{ value: string; label: string }>;
  selectedStock: SingleValue<{ value: string; label: string }>;
  selectedShelf: SingleValue<{ value: number; label: string }>;
  selectedFloor: SingleValue<{ value: number; label: string }>;
  searchTerm?: string;
}): Book[] {
  let filtered = [...data];

  // 🔍 Búsqueda por título o autor
  if (searchTerm && searchTerm.trim() !== "") {
    const lowerSearch = searchTerm.toLowerCase();
    const isNumeric = /^\d+$/.test(searchTerm); 

    filtered = filtered.filter(
      (book) => {
        const matchesText =
        book.ItemName?.toLowerCase().includes(lowerSearch) ||
        book.Author?.toLowerCase().includes(lowerSearch);

        const matchesNumber = isNumeric && (book.ISBN?.toString().includes(searchTerm))

        return matchesText || matchesNumber;
      }
    );
  }

  // Filtro por precio
  if (selectedPrice) {
    const [min, max] = selectedPrice.value.includes("+")
      ? [parseInt(selectedPrice.value), Infinity]
      : selectedPrice.value.split("-").map(Number);
    filtered = filtered.filter(
      (book) => book.SellingPrice >= min && book.SellingPrice <= max
    );
  }

  // Filtro por stock
  if (selectedStock) {
    const value = selectedStock.value;
    if (value === "0") {
      filtered = filtered.filter((book) => book.StockOnHand === 0);
    } else {
      const [min, max] = selectedStock.value.includes("+")
        ? [parseInt(selectedStock.value), Infinity]
        : selectedStock.value.split("-").map(Number);
      filtered = filtered.filter(
        (book) => book.StockOnHand >= min && book.StockOnHand <= max
      );
    }
  }

  // Filtro por estante
  if (selectedShelf) {
    filtered = filtered.filter((book) => book.Bookcase === selectedShelf.value);
  }

  // Filtro por piso
  if (selectedFloor) {
    filtered = filtered.filter(
      (book) => book.BookcaseFloor === selectedFloor.value
    );
  }

  // Orden alfabético
  if (sortOrder === "A-Z") {
    filtered.sort((a, b) => (a.ItemName || "").localeCompare(b.ItemName || ""));
  } else if (sortOrder === "Z-A") {
    filtered.sort((a, b) => (b.ItemName || "").localeCompare(a.ItemName || ""));
  }

  return filtered;
}
