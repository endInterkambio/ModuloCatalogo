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
  currentPage: number;

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
  selectAllBooks: () => void;
  selectCurrentPageBooks: () => void;
  resetSelection: () => void;
  resetCurrentPageSelection: () => void;

  // Setters
  setSearchTerm: (term: string) => void;
  setSortOrder: (value: string) => void;
  setSelectedPrice: (value: SingleValue<StringOption>) => void;
  setSelectedStock: (value: SingleValue<StringOption>) => void;
  setSelectedShelf: (value: SingleValue<NumberOption>) => void;
  setSelectedFloor: (value: SingleValue<NumberOption>) => void;
  setCurrentPage: (page: number) => void;

  // Core
  applyFilters: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  books: booksData,
  filteredBooks: booksData,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  // filtros
  searchTerm: "",
  sortOrder: "",
  selectedPrice: null,
  selectedStock: null,
  selectedShelf: null,
  selectedFloor: null,

  // Selección
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
  resetSelection: () => set({ selectedBooks: [] }),
  resetCurrentPageSelection: () => {
    const { filteredBooks, currentPage, selectedBooks } = get();
    const ITEMS_PER_PAGE = 12;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const currentPageBooks = filteredBooks.slice(start, end);
    const remainingBooks = selectedBooks.filter(
      (book) => !currentPageBooks.some((b) => b.SKU === book.SKU)
    );

    set({ selectedBooks: remainingBooks });
  },
  selectAllBooks: () => set({ selectedBooks: get().filteredBooks }),
  selectCurrentPageBooks: () => {
    const { filteredBooks, currentPage, selectedBooks } = get();
    const ITEMS_PER_PAGE = 12;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentPageBooks = filteredBooks.slice(start, end);

    // Evita duplicados usando el SKU como identificador
    const newSelection = [
      ...selectedBooks,
      ...currentPageBooks.filter(
        (book) => !selectedBooks.some((b) => b.SKU === book.SKU)
      ),
    ];

    set({ selectedBooks: newSelection });
  },

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
