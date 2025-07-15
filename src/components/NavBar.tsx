import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { useBookStore } from "@/stores/useBookStore";
import { generateJsPdfCatalog } from "./DynamicPdfDocument";

function NavBar() {
  const selectedBooks = useBookStore((state) => state.selectedBooks);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#">GusanitoLector</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Button
          variant="primary"
          onClick={() => generateJsPdfCatalog(selectedBooks)}
          disabled={selectedBooks.length === 0}
        >
          Descargar PDF
        </Button>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Buscar libro"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Buscar</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;
