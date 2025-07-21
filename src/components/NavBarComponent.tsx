// Import necessary components from react-bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
// Import store and PDF generation functions
import { useBookStore } from "@/stores/useBookStore";
import { generateJsPdfCatalog } from "@/components/DynamicPdfDocument";
import { useEffect, useState } from "react";

// Navigation bar component with search and PDF generation functionality
function NavBarComponent() {
  // Get selected books and search state from the store
  const selectedBooks = useBookStore((state) => state.selectedBooks);
  const searchTerm = useBookStore((state) => state.searchTerm);
  const setSearchTerm = useBookStore((state) => state.setSearchTerm);
  
  // State to track scroll position for navbar opacity effect
  const [scrolled, setScrolled] = useState(false);

  // Effect to handle scroll and adjust navbar opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Adjust this value to control when opacity changes
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      className={`bg-dark ${scrolled ? "opacity-75" : "opacity-100"} transition-opacity`} 
      sticky="top"
    >
      <Container fluid>
        {/* Brand/logo section */}
        <Navbar.Brand href="#" className="text-white fw-bold">GusanitoLector</Navbar.Brand>
        
        {/* PDF download button - only enabled when books are selected */}
        <div className="px-3 ms-auto">
          <Button
            className="btn-custom"
            onClick={() => generateJsPdfCatalog(selectedBooks)}
            disabled={selectedBooks.length === 0}
          >
            Descargar PDF
          </Button>
        </div>
        
        {/* Search form */}
        <Form className="d-flex pt-3 pt-sm-0">
          <Form.Control
            type="search"
            placeholder="Nombre o ISBN"
            className="me-2 px-3"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="btn-custom"
            type="submit"
            onClick={(e) => e.preventDefault()}
          >
            Buscar
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
