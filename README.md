# GusanitoLector - Book Catalog Application

A modern web application for managing and displaying a book catalog with filtering, sorting, and PDF generation capabilities.

## Features

- 📚 Comprehensive book catalog with detailed information
- 🔍 Advanced filtering options:
  - Price ranges
  - Stock quantities
  - Shelf locations
  - Floor locations
- 🔍 Sort books by:
  - Title (A-Z/Z-A)
  - Price (Low/High)
  - Stock quantity
- 📋 PDF catalog generation
- 📱 Responsive design
- 🎨 Modern UI with Bootstrap components

## Tech Stack

- React
- TypeScript
- React Bootstrap
- Zustand (State Management)
- jsPDF (PDF Generation)
- React Select

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── BookCardContent.tsx
│   ├── BookFilterSideBar.tsx
│   ├── NavBarComponent.tsx
│   ├── SmartPagination.tsx
│   └── ActiveFilters.tsx
├── pages/            # Page components
│   └── BookPage.tsx
├── stores/           # State management
│   └── useBookStore.ts
├── data/             # Data models and sample data
│   └── booksData.ts
└── utils/            # Utility functions
    └── filterBooks.ts
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/endInterkambio/ModuloCatalogo.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5176](http://localhost:5176) in your browser.

## Book Data Model

The application uses a structured book data model with the following fields:

```typescript
interface Book {
  ItemName: string;      // Book title
  SKU?: string;          // Stock Keeping Unit
  ISBN?: string;         // International Standard Book Number
  Condition?: string;    // Book condition
  StockOnHand: number;   // Available stock
  Category?: string;     // Book category
  Author: string;        // Author name
  Publisher?: string;    // Publisher name
  Language?: string;     // Book language
  SellingPrice: number;  // Price in local currency
  ImageUrl: string;      // Cover image URL
  Filter: string;        // Custom filter category
  Bookcase: number;      // Shelf number (1-17)
  BookcaseFloor: number; // Floor number (1-5)
}
```

## Key Features Implementation

### Filtering
- Price ranges: 0-50, 51-100, 101-200, 201+
- Stock quantities: 0, 1-5, 6-10, 11-20, 21+
- 17 shelves and 5 floors for physical location

### PDF Generation
- Generates a 3-column catalog layout
- Includes book images, titles, and prices
- Handles text truncation for long titles
- Maintains consistent formatting

### UI Components
- Responsive grid layout
- Smart pagination with ellipsis
- Dynamic filter sidebar
- Active filters display
- Book selection system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
