import jsPDF from "jspdf";
import { type Book } from "@/data/booksData";

/**
 * Genera un catálogo PDF de libros con diseño 3 columnas por fila.
 */
export const generateJsPdfCatalog = async (books: Book[]) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 8;
  const bottomMargin = 2; // Margen inferior indepen

  const columnCount = 3;
  const gap = 3;
  const cardWidth =
    (pageWidth - margin * 2 - gap * (columnCount - 1)) / columnCount;
  const cardHeight = 90;
  const imageHeight = 50;

  let x = margin;
  let y = margin + 10; // espacio para título

  // Funciones auxiliares para truncar texto
  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  const truncateToLines = (
    text: string,
    maxLines: number,
    lineWidth: number
  ): string[] => {
    if (!text) return [""];

    // Dividir el texto en líneas que caben en el ancho disponible
    const wrappedLines = doc.splitTextToSize(text, lineWidth);

    // Si hay más líneas de las permitidas
    if (wrappedLines.length > maxLines) {
      // Tomar solo las líneas permitidas
      const truncatedLines = wrappedLines.slice(0, maxLines);

      // Si la última línea es muy larga, truncarla y añadir "..."
      const lastLineIndex = truncatedLines.length - 1;
      const lastLine = truncatedLines[lastLineIndex];

      // Calcular cuánto espacio necesitan los "..."
      const ellipsisWidth = doc.getTextWidth("...");
      const availableWidth = lineWidth - ellipsisWidth;

      // Truncar la última línea si es necesario
      if (doc.getTextWidth(lastLine) > availableWidth) {
        let truncatedLastLine = lastLine;
        while (
          doc.getTextWidth(truncatedLastLine) > availableWidth &&
          truncatedLastLine.length > 0
        ) {
          truncatedLastLine = truncatedLastLine.slice(0, -1);
        }
        truncatedLines[lastLineIndex] = truncatedLastLine + "...";
      } else {
        truncatedLines[lastLineIndex] = lastLine + "...";
      }

      return truncatedLines;
    }

    return wrappedLines;
  };

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Catálogo de libros", pageWidth / 2, margin + 2, {
    align: "center",
  });

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    if (y + cardHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = margin;
    }

    // Intenta cargar imagen como base64
    let imageDataUrl = "";
    try {
      const res = await fetch(book.ImageUrl || "");
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
        y + 3,
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
    const textWidth = cardWidth - 10;

    // Calcular espacio disponible para texto (reservar espacio para el precio)
    const priceHeight = 8; // Altura estimada del precio
    const availableTextHeight = cardHeight - imageHeight - 14 - priceHeight; // 10 = padding inicial + final
    const maxTextY = y + imageHeight + 10 + availableTextHeight;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0);

    // TÍTULO DEL LIBRO - Máximo 2 líneas
    const titleLines = truncateToLines(book.ItemName || "", 2, textWidth);
    titleLines.forEach((line) => {
      if (textY + 4 <= maxTextY) {
        // Solo agregar si hay espacio
        doc.text(line, textLeft, textY);
        textY += 4; // Espaciado entre líneas
      }
    });
    textY += 2; // Espacio extra después del título

    // AUTOR - Máximo 2 líneas
    const authorLines = truncateToLines(book.Author || "", 2, textWidth);
    authorLines.forEach((line) => {
      if (textY + 4 <= maxTextY) {
        // Solo agregar si hay espacio
        doc.text(line, textLeft, textY);
        textY += 4; // Espaciado entre líneas
      }
    });
    textY += 2; // Espacio extra después del autor

    // EDITORIAL - Solo si hay espacio
    if (textY + 4 <= maxTextY) {
      const publisherText = truncateText(book.Publisher || "N/A", 25);
      doc.text(publisherText, textLeft, textY);
    }

    // PRECIO - Siempre al final de la tarjeta
    const priceY = y + cardHeight - 5; // 8mm desde el borde inferior
    doc.setTextColor(0, 171, 85); // Green
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`S/. ${book.SellingPrice.toFixed(2)}`, textLeft, priceY);

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
