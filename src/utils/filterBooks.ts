import type { SingleValue } from "react-select";
import type { Book } from "@/data/booksData";

export function filterBooks({
  data,
  sortOrder,
  selectedStock,
  selectedShelf,
  selectedFloor,
  selectedCondition,
  searchTerm,
  manualPriceMin,
  manualPriceMax,
}: {
  data: Book[];
  sortOrder: string;
  selectedStock: SingleValue<{ value: string; label: string }>;
  selectedShelf: SingleValue<{ value: number; label: string }>;
  selectedFloor: SingleValue<{ value: number; label: string }>;
  selectedCondition: SingleValue<{ value: string; label: string }>;
  searchTerm?: string;
  manualPriceMin?: number | null;
  manualPriceMax?: number | null;
}): Book[] {
  let filtered = [...data];

  // 🔍 Búsqueda por título o autor
  if (searchTerm && searchTerm.trim() !== "") {
    const lowerSearch = searchTerm.toLowerCase();
    const isNumeric = /^\d+$/.test(searchTerm);

    filtered = filtered.filter((book) => {
      const matchesText =
        book.ItemName?.toLowerCase().includes(lowerSearch) ||
        book.SKU?.toLowerCase().includes(lowerSearch) ||
        book.Author?.toLowerCase().includes(lowerSearch) ||
        book.Publisher?.toLowerCase().includes(lowerSearch) ||
        book.Category?.toLowerCase().includes(lowerSearch) ||
        book.Filter?.toLowerCase().includes(lowerSearch);

      const matchesNumber =
        isNumeric && book.ISBN?.toString().includes(searchTerm);

      return matchesText || matchesNumber;
    });
  }

  // Filtro por condición
  if (selectedCondition) {
    filtered = filtered.filter(
      (book) => book.Condition === selectedCondition.value
    );
  }

  // Filtro manual por precio min/max
  if (manualPriceMin !== null || manualPriceMax !== null) {
    filtered = filtered.filter((book) => {
      const min = manualPriceMin ?? -Infinity;
      const max = manualPriceMax ?? Infinity;
      return book.SellingPrice >= min && book.SellingPrice <= max;
    });
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
