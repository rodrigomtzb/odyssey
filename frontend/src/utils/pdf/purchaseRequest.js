import jsPDF from "jspdf";
import "jspdf-autotable";
import imgLogo from "../../assets/img/logo02.png";
import getParseFloat from "../getParseFloat";

const purchaseRequest = (purchase) => {
  const doc = new jsPDF();

  const supplierName =
    purchase.supplier?.fullName ||
    `${purchase.supplier?.legalName} - ${purchase.supplier.businessName}`;
  const projectName = purchase.project?.name || "USO INTERNO";
  // const projectAddress
  const customerName =
    purchase.project?.customer?.fullName ||
    purchase.project?.customer?.legalName;
  const requisitionId = purchase.id || "ID_NO_PROVIDED";
  const description = purchase.purchaseDescription || "SIN DESCRIPCIÓN";
  const date = new Date(purchase.creationDate || new Date());

  const font = "helvetica";
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const rounded = 2;
  const logoWidth = 24.6;
  const logoHeight = 16.1;
  const headerHeight = Math.max(logoHeight + 10, 25);

  doc.setLineWidth(0.4);
  doc.setDrawColor(20, 35, 59);

  // Rectángulo redondeado para el encabezado
  doc.roundedRect(
    margin,
    margin,
    pageWidth - 2 * margin,
    headerHeight,
    rounded,
    rounded
  );

  const logoX = margin + 5;
  const logoY = margin + (headerHeight - logoHeight) / 2;
  doc.addImage(imgLogo, "PNG", logoX, logoY, logoWidth, logoHeight);

  const logoDividerX = logoX + logoWidth + 5;
  doc.line(logoDividerX, margin, logoDividerX, margin + headerHeight);

  const rightDividerX = pageWidth - margin - 32;
  doc.line(rightDividerX, margin, rightDividerX, margin + headerHeight);

  const centerX = (logoDividerX + rightDividerX) / 2;
  const centerTextWidth = rightDividerX - logoDividerX - 10;
  const textY = margin + 8;
  doc.setFontSize(14);
  doc.setFont(font, "bold");
  doc.text(
    "GRUPO DINÁMICA, CONSTRUCCIÓN Y ACABADOS, S.A. DE C.V.",
    centerX,
    textY,
    { align: "center", maxWidth: centerTextWidth }
  );

  doc.setFontSize(12);
  doc.setFont(font, "normal");
  doc.text("REQUISICIÓN DE MATERIALES", centerX, textY + 14, {
    align: "center",
    maxWidth: centerTextWidth,
  });

  const rightTextX = rightDividerX + 3;
  const rightTextY = margin + 6;
  doc.setFontSize(10);
  doc.setFont(font, "bold");
  doc.text("N° de Solicitud:", rightTextX, rightTextY);
  doc.setFont(font, "normal");
  doc.text(requisitionId.toString(), rightTextX, rightTextY + 5);
  doc.setFont(font, "bold");
  doc.text("Fecha:", rightTextX, rightTextY + 12);
  doc.setFont(font, "normal");
  doc.text(date.toLocaleDateString(), rightTextX, rightTextY + 17);

  const contentY = margin + headerHeight + 4;
  const boxHeight = 34;
  const halfWidth = (pageWidth - 2 * margin) / 2;

  // Rectángulo redondeado para el contenido
  doc.roundedRect(
    margin,
    contentY,
    pageWidth - 2 * margin,
    boxHeight,
    rounded,
    rounded
  );

  const textPadding = 5;
  const lineHeight = 6;
  const textX = margin + textPadding;
  const textX2 = margin + halfWidth + textPadding;
  let contentTextY = contentY + textPadding + 2;

  doc.setFont(font, "bold");
  doc.text("Proveedor:", textX, contentTextY);
  doc.setFont(font, "normal");
  doc.text(String(supplierName), textX + 25, contentTextY, { maxWidth: halfWidth - 30 });

  doc.setFont(font, "bold");
  doc.text("Cliente:", textX2, contentTextY);
  doc.setFont(font, "normal");
  doc.text(String(customerName), textX2 + 25, contentTextY, { maxWidth: halfWidth - 30 });

  contentTextY += lineHeight + 5;
  doc.setFont(font, "bold");
  doc.text("Descripción:", textX, contentTextY);
  doc.setFont(font, "normal");
  doc.text(String(description), textX + 25, contentTextY, { maxWidth: halfWidth - 30 });

  doc.setFont(font, "bold");
  doc.text("Proyecto:", textX2, contentTextY);
  doc.setFont(font, "normal");
  doc.text(String(projectName), textX2 + 25, contentTextY, { maxWidth: halfWidth - 30 });

  contentTextY += lineHeight + 5;
  doc.setFont(font, "bold");
  doc.text("Lugar:", textX2, contentTextY);

  const tableColumn = [
    "Código",
    "Concepto",
    "Unidad",
    "Cantidad",
    "P.U",
    "Importe Total",
  ];
  const tableRows = purchase.items.map((item) => [
    item.id,
    item.material.name,
    item.unit.abbreviation,
    item.quantity,
    `$${getParseFloat(item.unit_price)}`,
    `$${getParseFloat(item.total_ammount)}`,
  ]);
  const totalAmount = purchase.total;
  tableRows.push(["", "", "", "", "TOTAL", `$${getParseFloat(totalAmount)}`]); // Mayúsculas en "TOTAL"

  const startY = 90;
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: startY,
    theme: "plain",
    headStyles: {
      fillColor: [20, 35, 59],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      cellPadding: 5,
    },
    bodyStyles: {
      fontSize: 10,
      halign: "center",
      cellPadding: 3,
      lineColor: [255, 255, 255], // Sin bordes internos
      lineWidth: 0,
    },
    alternateRowStyles: {
      fillColor: [220, 220, 220], // Color más marcado para las filas alternadas
    },
    tableLineColor: [20, 35, 59], // Borde externo
    tableLineWidth: 0.5,
    margin: { left: margin, right: margin },
    columnStyles: {
      4: { fontStyle: "bold" }, // Aplica negrita a la columna "TOTAL" (la quinta columna, índice 4)
    },
  });

  const bottomRectY = doc.internal.pageSize.height - margin - 30;
  const bottomBoxHeight = doc.internal.pageSize.height - bottomRectY - margin;

  // Rectángulo redondeado en la parte inferior
  doc.roundedRect(
    margin,
    bottomRectY,
    pageWidth - 2 * margin,
    bottomBoxHeight,
    rounded,
    rounded
  );

  const pdfBlob = doc.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);
  window.open(pdfURL, "_blank");
};


export default purchaseRequest;
