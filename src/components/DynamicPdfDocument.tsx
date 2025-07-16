import jsPDF from "jspdf";
import { type Book } from "@/data/booksData";

/**
 * Genera un catálogo PDF de libros con diseño 3 columnas por fila.
 */
export const generateJsPdfCatalog = async (books: Book[]) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  const columnCount = 3;
  const gap = 5;
  const cardWidth =
    (pageWidth - margin * 2 - gap * (columnCount - 1)) / columnCount;
  const cardHeight = 85;
  const imageHeight = 50;

  let x = margin;
  let y = margin + 10; // espacio para título

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Catálogo de libros", pageWidth / 2, margin + 2, {
    align: "center",
  });

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    if (y + cardHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    // Intenta cargar imagen como base64
    let imageDataUrl = "";
    try {
      const res = await fetch(book.URL || "");
      const blob = await res.blob();
      imageDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch {
      imageDataUrl = ""; // dejar vacío si falla
    }

    // Tarjeta
    doc.setDrawColor(220);
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y, cardWidth, cardHeight, "FD");

    // Imagen
    if (imageDataUrl) {
      doc.addImage(
        imageDataUrl,
        "JPEG",
        x + 5,
        y + 5,
        cardWidth - 10,
        imageHeight
      );
    } else {
      doc.setFontSize(10);
      doc.text("Sin imagen", x + cardWidth / 2, y + imageHeight / 2, {
        align: "center",
      });
    }

    // Texto
    let textY = y + imageHeight + 10;
    const textLeft = x + 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0);

    const wrapText = (text: string) =>
      doc.splitTextToSize(text, cardWidth - 10);

    doc.text(wrapText(book.Name), textLeft, textY);
    textY += 12;

    doc.text(`${book.Author}`, textLeft, textY);
    textY += 3;

    doc.text(`${book.Publisher ?? "N/A"}`, textLeft, textY);
    textY += 8;

    doc.setTextColor(0, 171, 85); // Green
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`S/. ${book.PreciodeVenta.toFixed(2)}`, textLeft, textY);
    textY += 3;

    // Avanzar a la siguiente columna/fila
    const isLastInRow = (i + 1) % columnCount === 0;
    if (isLastInRow) {
      x = margin;
      y += cardHeight + gap;
    } else {
      x += cardWidth + gap;
    }
  }

  doc.save("catalogo-libros.pdf");
};
