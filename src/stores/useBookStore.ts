// Import necessary dependencies and types
import { create } from "zustand";
import { type SingleValue } from "react-select";
import { booksData, type Book } from "@/data/booksData";
import { filterBooks } from "@/utils/filterBooks";

type StringOption = { value: string; label: string };
type NumberOption = { value: number; label: string };

// Interface defining the book store state and actions
interface BookStore {
  // Core data
  books: Book[];                    // All books in the system
  filteredBooks: Book[];            // Books after applying filters
  currentPage: number;              // Current pagination page

  // Filter state
  searchTerm: string;               // Search term for book titles
  sortOrder: string;                // Sort order for books (e.g., 'asc', 'desc')
  selectedPrice: SingleValue<StringOption>;  // Selected price filter
  selectedStock: SingleValue<StringOption>;  // Selected stock filter
  selectedShelf: SingleValue<NumberOption>;  // Selected shelf filter
  selectedFloor: SingleValue<NumberOption>;  // Selected floor filter

  // Book selection state
  selectedBooks: Book[];            // Currently selected books
  toggleBook: (book: Book) => void; // Toggle selection of a single book
  selectAllBooks: () => void;       // Select all books
  selectCurrentPageBooks: () => void; // Select all books on current page
  resetSelection: () => void;       // Clear all book selections
  resetCurrentPageSelection: () => void; // Clear selections on current page

  // Filter setter methods
  setSearchTerm: (term: string) => void;    // Set search term
  setSortOrder: (value: string) => void;    // Set sort order
  setSelectedPrice: (value: SingleValue<StringOption>) => void;  // Set price filter
  setSelectedStock: (value: SingleValue<StringOption>) => void;  // Set stock filter
  setSelectedShelf: (value: SingleValue<NumberOption>) => void;  // Set shelf filter
  setSelectedFloor: (value: SingleValue<NumberOption>) => void;  // Set floor filter
  setCurrentPage: (page: number) => void;   // Set current page

  // Core functionality
  applyFilters: () => void;  // Apply all filters to books
}

// Create the book store using Zustand
export const useBookStore = create<BookStore>((set, get) => ({
  books: booksData,           // Initialize with all books from data source
  filteredBooks: booksData,   // Initially show all books
  currentPage: 1,            // Start on first page
  setCurrentPage: (page) => set({ currentPage: page }),

  // Filter state
  searchTerm: "",               // Search term for book titles
  sortOrder: "",                // Sort order for books (e.g., 'asc', 'desc')
  selectedPrice: null,          // Selected price filter
  selectedStock: null,          // Selected stock filter
  selectedShelf: null,          // Selected shelf filter
  selectedFloor: null,          // Selected floor filter

  // Book selection state
  selectedBooks: [],            // Currently selected books
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

  // Filter setter methods with reactive filter application
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

  // Core functionality
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

    set({ filteredBooks: filtered, currentPage: 1 });
  },
}));
