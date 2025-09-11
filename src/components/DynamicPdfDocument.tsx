// Import necessary dependencies
import jsPDF from "jspdf";
import { type Book } from "@/data/booksData";
import imagePlaceholder from "@assets/no-image.jpg";
import instagram from "@assets/instagram.png";
import facebook from "@assets/facebook.png";
import whatsapp from "@assets/whatsapp.png";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";
import mailIcon from "@assets/email.png";
import phoneIcon from "@assets/phone.png";

/**
 * Generates a PDF catalog from an array of books
 * The catalog is formatted in a 3-column layout with each book displayed as a card
 * @param books Array of books to include in the catalog
 */

/**
 * Convierte una imagen a base64
 */

export const generateJsPdfCatalog = async (books: Book[]) => {
  // Initialize PDF document
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Layout constants
  const margin = 8;
  const bottomMargin = 2; // Independent bottom margin
  const columnCount = 3;
  const gap = 3;

  // Calculate card dimensions based on page size and layout
  const cardWidth =
    (pageWidth - margin * 2 - gap * (columnCount - 1)) / columnCount;
  const cardHeight = 80;
  const imageHeight = 40;

  // Initialize coordinates
  let x = margin;
  let y = margin + 10; // Space for title

  // Helper function to truncate text to a maximum length
  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  // Helper function to split text into multiple lines
  // Ensures text fits within specified width and maximum number of lines
  const truncateToLines = (
    text: string,
    maxLines: number,
    lineWidth: number
  ): string[] => {
    if (!text) return [""];

    // Split text into lines that fit the available width
    const wrappedLines = doc.splitTextToSize(text, lineWidth);

    // If there are more lines than allowed
    if (wrappedLines.length > maxLines) {
      // Take only the allowed number of lines
      const truncatedLines = wrappedLines.slice(0, maxLines);

      // If the last line is too long, truncate it and add "..."
      const lastLine = truncatedLines[truncatedLines.length - 1];
      if (doc.getStringUnitWidth(lastLine) > lineWidth) {
        const truncatedLastLine = truncateText(lastLine, lineWidth);
        truncatedLines[truncatedLines.length - 1] = truncatedLastLine;
      }

      return truncatedLines;
    }

    return wrappedLines;
  };

  // Add title to PDF
  // doc.setFont("helvetica", "bold");
  // doc.setFontSize(18);
  // doc.text("Catálogo de libros", pageWidth / 2, margin + 2, {
  //   align: "center",
  // });

  // Footer del PDF con íconos + texto más alineado y 3 columnas
  const addFooter = async (
    doc: jsPDF,
    pageWidth: number,
    pageHeight: number
  ) => {
    const footerHeight = 14;
    const footerY = pageHeight - footerHeight;
    const colWidths = [pageWidth * 0.4, pageWidth * 0.3, pageWidth * 0.3];
    const iconSize = 10;
    let xPos = 0;

    // 🔹 Fondo completo
    doc.setFillColor(0, 171, 85);
    doc.rect(0, footerY, pageWidth, footerHeight, "F");

    // 🔹 Estilo de texto
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");

    const textY = footerY + footerHeight / 2 + 3;

    // Helper: ícono + texto
    const addIconWithText = async (
      iconPath: string,
      text: string,
      x: number,
      y: number
    ) => {
      const { base64, width, height } = await loadImageAsBase64(iconPath);
      const aspectRatio = width / height;
      let drawW = iconSize;
      let drawH = iconSize;
      if (aspectRatio > 1) drawH = iconSize / aspectRatio;
      else drawW = iconSize * aspectRatio;

      const offsetY = y + (footerHeight - drawH) / 2;
      doc.addImage(base64, "PNG", x + 2, offsetY, drawW, drawH);

      const textOffsetX = x + 2 + drawW + 0.3; // 🔹 espacio mínimo
      doc.text(text, textOffsetX, textY);
    };

    // Columna 1: correo
    await addIconWithText(mailIcon, "info@gusanitolector.pe", xPos, footerY);
    xPos += colWidths[0];

    // Columna 2: teléfono
    await addIconWithText(phoneIcon, "+51 989-564-504", xPos, footerY);
    xPos += colWidths[1];

    // Columna 3: íconos sociales (Facebook, Instagram, WhatsApp)
    const addIcon = async (imgPath: string, x: number, y: number) => {
      const { base64, width, height } = await loadImageAsBase64(imgPath);
      const aspectRatio = width / height;
      let drawW = iconSize;
      let drawH = iconSize;
      if (aspectRatio > 1) drawH = iconSize / aspectRatio;
      else drawW = iconSize * aspectRatio;

      const offsetY = y + (footerHeight - drawH) / 2;
      doc.addImage(base64, "PNG", x, offsetY, drawW, drawH);
    };

    // distribuir 3 íconos dentro de la columna
    const icons = [facebook, instagram, whatsapp];
    const spacing = 5; // espacio mínimo entre ellos
    let socialX =
      xPos +
      (colWidths[2] -
        (icons.length * iconSize + (icons.length - 1) * spacing)) /
        2;

    for (const icon of icons) {
      await addIcon(icon, socialX, footerY);
      socialX += iconSize + spacing;
    }
  };

  // Process each book
  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    // Add new page if there's not enough space
    if (y + cardHeight > pageHeight - bottomMargin) {
      // Colocar footer en la página actual antes de pasar a la siguiente
      await addFooter(doc, pageWidth, pageHeight);

      doc.addPage();
      x = margin;
      y = margin;
    }

    // Add book card
    doc.setDrawColor(220);
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y, cardWidth, cardHeight, "FD");

    // Add book image (or placeholder)
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

    // Add book image
    const addBookImage = async (
      doc: jsPDF,
      imageDataUrl: string,
      x: number,
      y: number,
      cardWidth: number,
      imageHeight: number,
      fitMode: "cover" | "contain" = "cover" // por defecto 'cover'
    ) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = imageDataUrl;

        img.onload = () => {
          const targetWidth = cardWidth - 10;
          const targetHeight = imageHeight;

          const imgWidth = img.width;
          const imgHeight = img.height;
          const imgAspect = imgWidth / imgHeight;
          const targetAspect = targetWidth / targetHeight;

          if (fitMode === "cover") {
            // Recorte para llenar el espacio completo
            let sx = 0,
              sy = 0,
              sWidth = imgWidth,
              sHeight = imgHeight;

            if (imgAspect > targetAspect) {
              sWidth = imgHeight * targetAspect;
              sx = (imgWidth - sWidth) / 2;
            } else {
              sHeight = imgWidth / targetAspect;
              sy = (imgHeight - sHeight) / 2;
            }

            const canvas = document.createElement("canvas");
            const scale = 3;
            canvas.width = targetWidth * scale;
            canvas.height = targetHeight * scale;
            const ctx = canvas.getContext("2d");

            if (ctx) {
              ctx.drawImage(
                img,
                sx,
                sy,
                sWidth,
                sHeight,
                0,
                0,
                canvas.width,
                canvas.height
              );

              const highResDataUrl = canvas.toDataURL("image/jpeg", 0.95);
              doc.addImage(
                highResDataUrl,
                "JPEG",
                x + 5,
                y + 3,
                targetWidth,
                targetHeight
              );
            }
          } else if (fitMode === "contain") {
            // Redimensiona manteniendo todo el contenido visible
            let drawWidth = targetWidth;
            let drawHeight = targetWidth / imgAspect;

            // Si el alto excede el área disponible, ajustar a alto máximo
            if (drawHeight > targetHeight) {
              drawHeight = targetHeight;
              drawWidth = drawHeight * imgAspect;
            }

            // Centrar horizontal y verticalmente
            const offsetX = x + 5 + (targetWidth - drawWidth) / 2;
            const offsetY = y + 3 + (targetHeight - drawHeight) / 2;

            doc.addImage(
              imageDataUrl,
              "JPEG",
              offsetX,
              offsetY,
              drawWidth,
              drawHeight
            );
          }

          resolve();
        };

        img.onerror = () => resolve();
      });
    };

    await addBookImage(
      doc,
      imageDataUrl ? imageDataUrl : imagePlaceholder,
      x,
      y,
      cardWidth,
      imageHeight,
      "contain"
    );

    // Add book title (truncated if too long)

    let textY = y + imageHeight + 10;
    const textLeft = x + 5;
    const textWidth = cardWidth - 10;

    // Calcular espacio disponible para texto (reservar espacio para el precio)
    const priceHeight = 8; // Altura estimada del precio
    const availableTextHeight = cardHeight - imageHeight - 14 - priceHeight; // 10 = padding inicial + final
    const maxTextY = y + imageHeight + 10 + availableTextHeight;

    doc.setFont("helvetica", "bold");
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

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0);
    const isbnLines = truncateToLines(book.ISBN || "", 2, textWidth);
    isbnLines.forEach((line) => {
      if (textY + 4 <= maxTextY) {
        // Solo agregar si hay espacio
        doc.text("ISBN: " + line, textLeft, textY);
        textY += 4; // Espaciado entre líneas
      }
    });
    textY += 2; //Espaciado extra después del ISBN

    // AUTOR - Máximo 2 líneas
    // const authorLines = truncateToLines(book.Author || "", 2, textWidth);
    // authorLines.forEach((line) => {
    //   if (textY + 4 <= maxTextY) {
    //     // Solo agregar si hay espacio
    //     doc.text(line, textLeft, textY);
    //     textY += 4; // Espaciado entre líneas
    //   }
    // });
    // textY += 2; // Espacio extra después del autor

    // EDITORIAL - Solo si hay espacio
    // if (textY + 4 <= maxTextY) {
    //   const publisherText = truncateText(book.Publisher || "N/A", 25);
    //   doc.text(publisherText, textLeft, textY);
    // }

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

  // Footer

  // Save the PDF
  doc.save("catalogo-libros.pdf");
};
