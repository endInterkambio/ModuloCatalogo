import { useState } from "react";
import { Card, Col, Container, Row, Modal, Button } from "react-bootstrap";
import { BookCardContentProps } from "@components/BookCardContent";
import { booksData } from "@/data/booksData";
import { type Books } from "data/booksData";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DynamicPdfDocument } from "@components/DynamicPdfDocument";


function BookPage() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const handleExportPDF = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const selectedBooks = booksData.filter((book) => selectedCards.includes(book.SKU ?? ""));

  return (
    <>
      <Container>
        <Row className="mb-3">
          <Col xs={12} className="d-flex justify-content-end">
            <Button onClick={handleExportPDF} disabled={selectedBooks.length === 0}>
              Exportar PDF
            </Button>
          </Col>
        </Row>
        <Row>
          {booksData.map((book: Books) => {
            const id = book.SKU ?? "";
            const isSelected = selectedCards.includes(id);
            return (
              <Col key={id} xs={12} sm={4} md={4} className="p-3">
                <Card className="d-flex flex-row" style={{ height: "300px" }}>
                  <BookCardContentProps
                    book={{
                      ...book,
                      id,
                      author: book.Author ?? "",
                      name: book.Name ?? "",
                      description: book.Description ?? "",
                      price: book.PreciodeVenta ?? 0,
                      URL: book.URL ?? "",
                    }}
                    onSelect={handleSelect}
                    isSelected={isSelected}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Vista previa del PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: 400 }}>
          <PDFDownloadLink
            document={<DynamicPdfDocument data={selectedBooks} />}
            fileName="libros-seleccionados.pdf"
          >
            {({ loading }) =>
              loading ? "Generando PDF..." : <Button>Descargar PDF</Button>
            }
          </PDFDownloadLink>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookPage;
