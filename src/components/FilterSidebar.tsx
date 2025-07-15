import BookPage from "@/pages/BookPage";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { booksData } from "@/data/booksData";

const ProductListPage = () => {
  const [books, setBooks] = useState(booksData); // Supone que booksData es tu array original
  const [sortOrder, setSortOrder] = useState(""); // Estado para ordenar

  useEffect(() => {
  if (sortOrder === "A-Z") {
    const sorted = [...books].sort((a, b) => (a.Name || "").localeCompare(b.Name || ""));
    setBooks(sorted);
  } else if (sortOrder === "Z-A") {
    const sorted = [...books].sort((a, b) => (b.Name || "").localeCompare(a.Name || ""));
    setBooks(sorted);
  } else {
    setBooks(booksData); // Restaurar si no hay orden
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [sortOrder]);


  const estantes = [...Array(17).keys()].map((i) => ({
    value: i + 1,
    label: `Estante ${i + 1}`,
  }));

  const pisos = [...Array(3).keys()].map((i) => ({
    value: i + 1,
    label: `Piso ${i + 1}`,
  }));

  const precios = [
    { value: "0-50", label: "S/. 0 - S/. 50" },
    { value: "51-100", label: "S/. 51 - S/. 100" },
    { value: "101-200", label: "S/. 101 - S/. 200" },
    { value: "201+", label: "S/. 201 en adelante" },
  ];

  const cantidades = [
    { value: "1-5", label: "1 - 5" },
    { value: "6-10", label: "6 - 10" },
    { value: "11-20", label: "11 - 20" },
    { value: "21+", label: "21 en adelante" },
  ];

  return (
    <Container fluid>
      <Row style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Col xs={12} md={3} lg={2} className="p-0">
          <div className="bg-light p-3 h-100 border-end">
            <h4 className="mb-4">Filtros</h4>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Seleccionar orden</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Select
                options={precios}
                placeholder="Selecciona precio"
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "100%",
                  }),
                  control: (base) => ({
                    ...base,
                    minHeight: 50,
                    height: 50,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }),
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Select
                options={cantidades}
                placeholder="Selecciona stock"
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "100%",
                  }),
                  control: (base) => ({
                    ...base,
                    minHeight: 50,
                    height: 50,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }),
                }}
              />
            </Form.Group>
            <Form.Label>Ubicación</Form.Label>
            <Form.Group className="mb-3 d-flex flex-row">
              <Select
                options={estantes}
                placeholder="Selecciona estante"
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "100%",
                  }),
                  control: (base) => ({
                    ...base,
                    minHeight: 50,
                    height: 50,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }),
                }}
              />

              <Select
                options={pisos}
                placeholder="Selecciona piso"
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "100%",
                  }),
                  control: (base) => ({
                    ...base,
                    minHeight: 50,
                    height: 50,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }),
                }}
              />
            </Form.Group>
          </div>
        </Col>

        {/* Contenido principal */}
        <Col xs={12} md={9} lg={10} className="p-4">
          <BookPage books={books}/>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
