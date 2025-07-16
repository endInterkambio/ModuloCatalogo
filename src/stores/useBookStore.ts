// stores/useBookStore.ts
import { create } from "zustand";
import { booksData, type Book } from "@/data/booksData";
import { filterBooks } from "@/utils/filterBooks";
import { type SingleValue } from "react-select";

type StringOption = { value: string; label: string };
type NumberOption = { value: number; label: string };

interface BookStore {
  books: Book[];
  filteredBooks: Book[];

  // Filtros
  searchTerm: string;
  sortOrder: string;
  selectedPrice: SingleValue<StringOption>;
  selectedStock: SingleValue<StringOption>;
  selectedShelf: SingleValue<NumberOption>;
  selectedFloor: SingleValue<NumberOption>;

  // Selección de libros
  selectedBooks: Book[];
  toggleBook: (book: Book) => void;
  resetBook: () => void;

  // Setters
  setSearchTerm: (term: string) => void;
  setSortOrder: (value: string) => void;
  setSelectedPrice: (value: SingleValue<StringOption>) => void;
  setSelectedStock: (value: SingleValue<StringOption>) => void;
  setSelectedShelf: (value: SingleValue<NumberOption>) => void;
  setSelectedFloor: (value: SingleValue<NumberOption>) => void;

  // Core
  applyFilters: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  books: booksData,
  filteredBooks: booksData,

  // filtros
  searchTerm: "",
  sortOrder: "",
  selectedPrice: null,
  selectedStock: null,
  selectedShelf: null,
  selectedFloor: null,

  // selección
  selectedBooks: [],
  toggleBook: (book) => {
    const selectedBooks = get().selectedBooks;
    const exists = selectedBooks.find((b) => b.SKU === book.SKU);
    if (exists) {
      set({ selectedBooks: selectedBooks.filter((b) => b.SKU !== book.SKU) });
    } else {
      set({ selectedBooks: [...selectedBooks, book] });
    }
  },
  resetBook: () => set({ selectedBooks: [] }),

  // setters con filtros reactivos
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().applyFilters();
  },
  setSortOrder: (value) => {
    set({ sortOrder: value });
    get().applyFilters();
  },
  setSelectedPrice: (value) => {
    set({ selectedPrice: value });
    get().applyFilters();
  },
  setSelectedStock: (value) => {
    set({ selectedStock: value });
    get().applyFilters();
  },
  setSelectedShelf: (value) => {
    set({ selectedShelf: value });
    get().applyFilters();
  },
  setSelectedFloor: (value) => {
    set({ selectedFloor: value });
    get().applyFilters();
  },

  applyFilters: () => {
    const {
      books,
      sortOrder,
      selectedPrice,
      selectedStock,
      selectedShelf,
      selectedFloor,
      searchTerm,
    } = get();

    const filtered = filterBooks({
      data: books,
      sortOrder,
      selectedPrice,
      selectedStock,
      selectedShelf,
      selectedFloor,
      searchTerm,
    });

    set({ filteredBooks: filtered });
  },
}));
