import { create } from "zustand";
import {type Book} from "@/data/booksData";

interface BookStore {
    selectedBooks: Book[];
    toggleBook: (book: Book) => void;
    resetBook: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
        selectedBooks: [],
        toggleBook: (book: Book) => {
            const selectedBooks = get().selectedBooks;
            const exists = selectedBooks.find((b: Book) => b.SKU === book.SKU);
            if (exists) {
                set({ selectedBooks: selectedBooks.filter((b: Book) => b.SKU !== book.SKU) });
            } else {
                set({ selectedBooks: [...selectedBooks, book] });
            }
        },
        resetBook: () => set({ selectedBooks: [] }),
    })
);
