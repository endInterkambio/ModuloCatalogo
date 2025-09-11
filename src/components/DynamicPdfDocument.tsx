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
import logo from "@assets/logo.png"; // <-- ajusta la ruta a tu logo

export const generateJsPdfCatalog = async (books: Book[]) => {
  // Initialize PDF document
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Layout constants
  const margin = 8;
  const bottomMargin = 18; // margen inferior aumentado para el footer
  const columnCount = 3;
  const gap = 3;

  // Calculate card dimensions based on page size and layout
  const cardWidth =
    (pageWidth - margin * 2 - gap * (columnCount - 1)) / columnCount;
  const cardHeight = 75;
  const imageHeight = 35;

  // Helpers (truncate, split lines) - los mantienes igual
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
    const wrappedLines = doc.splitTextToSize(text, lineWidth);
    if (wrappedLines.length > maxLines) {
      const truncatedLines = wrappedLines.slice(0, maxLines);
      const lastLine = truncatedLines[truncatedLines.length - 1];
      if (doc.getStringUnitWidth(lastLine) > lineWidth) {
        const truncatedLastLine = truncateText(lastLine, lineWidth);
        truncatedLines[truncatedLines.length - 1] = truncatedLastLine;
      }
      return truncatedLines;
    }
    return wrappedLines;
  };

  // ---------------------
  // Header: 2 columnas (texto 4 filas + logo)
  // ---------------------
  const addHeader = async (
    doc: jsPDF,
    pageWidth: number,
    margin: number,
    logoPath: string
  ) => {
    const headerHeight = 30; // altura fija del header
    //const col1Width = pageWidth * 0.6;
    const col2Width = pageWidth * 0.4;
    const startY = margin - 3;

    // Columna 1: información en 4 filas
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Gusanito Lector E.I.R.L", margin, startY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Dirección: Av. Los Quechuas 1372, Urb. Parques de Monterrico, ATE",
      margin,
      startY + 12
    );
    doc.text("Telf.: +51 989-564-504", margin, startY + 18);
    doc.text("Correo: info@gusanitolector.pe", margin, startY + 24);

    // Columna 2: logo (mantener proporción)
    try {
      const { base64, width, height } = await loadImageAsBase64(logoPath);
      const aspectRatio = width / height;
      let logoW = col2Width - margin * 2; // ancho máximo
      let logoH = headerHeight - 6; // alto máximo

      if (logoW / logoH > aspectRatio) {
        logoW = logoH * aspectRatio;
      } else {
        logoH = logoW / aspectRatio;
      }

      const logoX = pageWidth - margin - logoW; // alineado a la derecha
      const logoY = startY + (headerHeight - logoH) / 2;
      doc.addImage(base64, "PNG", logoX, logoY, logoW, logoH);
    } catch (err) {
      // Si falla la carga del logo, no hacer nada (no rompa el PDF)
      console.warn("No se pudo cargar logo para header:", err);
    }

    return headerHeight;
  };

  // ---------------------
  // Footer: 3 columnas (correo | teléfono | sociales en fila)
  // ---------------------
  const addFooter = async (
    doc: jsPDF,
    pageWidth: number,
    pageHeight: number
  ) => {
    const footerHeight = 15;
    const footerY = pageHeight - footerHeight;
    const colWidths = [pageWidth * 0.4, pageWidth * 0.3, pageWidth * 0.3];
    const iconSize = 10;
    let xPos = 0;

    // Fondo completo
    doc.setFillColor(0, 171, 85);
    doc.rect(0, footerY, pageWidth, footerHeight, "F");

    // Estilo de texto
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");

    const textY = footerY + footerHeight / 2 + 3;

    // helper: ícono + texto (col 1 y 2)
    const addIconWithText = async (
      iconPath: string,
      text: string,
      x: number,
      y: number
    ) => {
      try {
        const { base64, width, height } = await loadImageAsBase64(iconPath);
        const aspectRatio = width / height;
        let drawW = iconSize;
        let drawH = iconSize;
        if (aspectRatio > 1) drawH = iconSize / aspectRatio;
        else drawW = iconSize * aspectRatio;

        const offsetY = y + (footerHeight - drawH) / 2;
        doc.addImage(base64, "PNG", x + 2, offsetY, drawW, drawH);

        const textOffsetX = x + 2 + drawW + 0.3; // espacio mínimo
        doc.text(text, textOffsetX, textY);
      } catch (err) {
        console.warn("Error cargando icono footer:", err);
      }
    };

    // Columna 1: correo
    await addIconWithText(mailIcon, "info@gusanitolector.pe", xPos, footerY);
    xPos += colWidths[0];

    // Columna 2: teléfono
    await addIconWithText(phoneIcon, "+51 989-564-504", xPos, footerY);
    xPos += colWidths[1];

    // Columna 3: sociales en fila
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

    const icons = [facebook, instagram, whatsapp];
    const spacing = 4; // menos espacio entre ellos
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

  // ---------------------
  // Inicializar header y coordenadas (UNA sola vez)
  // ---------------------
  let headerHeight = 0;
  try {
    headerHeight = await addHeader(doc, pageWidth, margin, logo);
  } catch (err) {
    console.log(err);
    headerHeight = 0;
  }

  // Título SOLO en la primera página
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 171, 85); // verde corporativo
  doc.text("Catálogo de Libros", pageWidth / 2, margin + headerHeight + 5, {
    align: "center",
  });

  // inicializar coordenadas para tarjetas (dejamos espacio para header + título)
  let x = margin;
  let y = margin + headerHeight + 10; // espacio extra por el título

  // ---------------------
  // Loop de libros
  // ---------------------
  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    // Add new page if there's not enough space
    if (y + cardHeight > pageHeight - bottomMargin) {
      // footer en la página actual
      await addFooter(doc, pageWidth, pageHeight);

      // nueva página y re-dibujar header (sin título)
      doc.addPage();
      try {
        headerHeight = await addHeader(doc, pageWidth, margin, logo);
      } catch (err) {
        console.log(err);
        headerHeight = 0;
      }

      x = margin;
      y = margin + headerHeight + 5;
    }

    // Tarjeta (igual que antes)
    doc.setDrawColor(220);
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y, cardWidth, cardHeight, "FD");

    // Cargar imagen del libro (mantener tu lógica)
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
      imageDataUrl = "";
    }

    // Función addBookImage (tu implementación, sin cambios)
    const addBookImage = async (
      doc: jsPDF,
      imageDataUrl: string,
      x: number,
      y: number,
      cardWidth: number,
      imageHeight: number,
      fitMode: "cover" | "contain" = "cover"
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
            let drawWidth = targetWidth;
            let drawHeight = targetWidth / imgAspect;

            if (drawHeight > targetHeight) {
              drawHeight = targetHeight;
              drawWidth = drawHeight * imgAspect;
            }

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

    // Texto del libro (igual que antes)
    let textY = y + imageHeight + 10;
    const textLeft = x + 5;
    const textWidth = cardWidth - 10;

    const priceHeight = 8;
    const availableTextHeight = cardHeight - imageHeight - 14 - priceHeight;
    const maxTextY = y + imageHeight + 10 + availableTextHeight;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(0);
    const titleLines = truncateToLines(book.ItemName || "", 2, textWidth);
    titleLines.forEach((line) => {
      if (textY + 4 <= maxTextY) {
        doc.text(line, textLeft, textY);
        textY += 4;
      }
    });
    textY += 2;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0);
    const isbnLines = truncateToLines(book.ISBN || "", 2, textWidth);
    isbnLines.forEach((line) => {
      if (textY + 4 <= maxTextY) {
        doc.text("ISBN: " + line, textLeft, textY);
        textY += 4;
      }
    });
    textY += 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 0, 0);
    const infoLines = "Stock a disponilidad";
    doc.text(infoLines, textLeft, textY);
    textY += 2;

    // Precio
    const priceY = y + cardHeight - 5;
    doc.setTextColor(0, 171, 85);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`S/. ${book.SellingPrice.toFixed(2)}`, textLeft, priceY);

    // Avanzar columna/fila
    const isLastInRow = (i + 1) % columnCount === 0;
    if (isLastInRow) {
      x = margin;
      y += cardHeight + gap;
    } else {
      x += cardWidth + gap;
    }
  } // end loop books

  // Footer final en la última página
  await addFooter(doc, pageWidth, pageHeight);

  // Save the PDF
  doc.save("catalogo-libros.pdf");
};
