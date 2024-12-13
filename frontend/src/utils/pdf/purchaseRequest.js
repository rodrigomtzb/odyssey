import jsPDF from "jspdf";
import "jspdf-autotable";
import imgLogo from "../../assets/img/logo-dinamica.png";
import getParseFloat from "../getParseFloat";

const purchaseRequest = (purchase) => {
  const doc = new jsPDF();

  const supplierName =
    purchase.supplier?.fullName ||
    `${purchase.supplier?.legalName} - ${purchase.supplier.businessName}`;
  const projectName = purchase.project?.name || "USO INTERNO";
  const requisitionId = purchase.id || "ID_NO_PROVIDED";
  const description = purchase.purchaseDescription || "SIN DESCRIPCIÓN";
  const date = new Date(purchase.creationDate || new Date());

  const font = "helvetica";
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 8;
  const logoWidth = 20;
  const logoHeight = 22.57;
  const headerHeight = Math.max(logoHeight + 10, 35);

  doc.setLineWidth(0.4);

  const borderRadius = 3;
  doc.setDrawColor(20, 35, 59);
  doc.roundedRect(margin, margin, pageWidth - 2 * margin, headerHeight, borderRadius, borderRadius);

  const logoX = margin + 5;
  const logoY = margin + (headerHeight - logoHeight) / 2;
  doc.addImage(imgLogo, "PNG", logoX, logoY, logoWidth, logoHeight);

  const logoDividerX = logoX + logoWidth + 5;
  doc.line(logoDividerX, margin, logoDividerX, margin + headerHeight);

  const rightDividerX = pageWidth - margin - 30;
  doc.line(rightDividerX, margin, rightDividerX, margin + headerHeight);

  const centerX = (logoDividerX + rightDividerX) / 2;
  const centerTextWidth = rightDividerX - logoDividerX - 10;
  const textY = margin + 10;
  doc.setFontSize(16);
  doc.setFont(font, "bold");
  doc.text(
    "GRUPO DINÁMICA, CONSTRUCCIÓN Y ACABADOS, S.A. DE C.V.",
    centerX,
    textY,
    { align: "center", maxWidth: centerTextWidth }
  );

  doc.setFontSize(12);
  doc.setFont(font, "normal");
  doc.text("REQUISICIÓN DE MATERIALES", centerX, textY + 20, {
    align: "center",
    maxWidth: centerTextWidth,
  });

  const rightTextX = rightDividerX + 5;
  const rightTextY = margin + 10;
  doc.setFontSize(10);
  doc.setFont(font, "bold");
  doc.text("Fecha:", rightTextX, rightTextY);
  doc.setFont(font, "normal");
  doc.text(date.toLocaleDateString(), rightTextX, rightTextY + 6);
  doc.setFont(font, "bold");
  doc.text("ID:", rightTextX, rightTextY + 12);
  doc.setFont(font, "normal");
  doc.text(requisitionId.toString(), rightTextX, rightTextY + 18);

  const contentY = margin + headerHeight + 4;
  const boxHeight = 24;
  doc.roundedRect(margin, contentY, pageWidth - 2 * margin, boxHeight, borderRadius, borderRadius);

  const textPadding = 7;
  const lineHeight = 6;
  const textX = margin + textPadding;
  let contentTextY = contentY + textPadding;

  doc.setFont(font, "bold");
  doc.text("Proveedor:", textX, contentTextY);
  doc.setFont(font, "normal");
  doc.text(String(supplierName), textX + 25, contentTextY);

  contentTextY += lineHeight;
  doc.setFont(font, "bold");
  doc.text("Proyecto:", textX, contentTextY);
  doc.setFont(font, "normal");
  doc.text(String(projectName), textX + 25, contentTextY);

  contentTextY += lineHeight;
  doc.setFont(font, "bold");
  doc.text("Descripción:", textX, contentTextY);
  doc.setFont(font, "normal");
  doc.text(String(description), textX + 25, contentTextY);

  const tableColumn = [
    "Código",
    "Concepto",
    "Unidad",
    "Cantidad",
    "P.U",
    "Importe total",
  ];

  const tableRows = purchase.items.map((item) => [
    item.id,
    item.material.name,
    item.unit.abbreviation,
    item.quantity,
    `$${getParseFloat(item.unit_price)}`,
    `$${getParseFloat(item.total_ammount)}`,
  ]);

  while (tableRows.length < 15) {
    tableRows.push(["", "", "", "", "", ""]);
  }

  const totalAmount = purchase.total;
  tableRows.push(["", "", "", "", "Total", `$${getParseFloat(totalAmount)}`]);

  const startY = contentTextY + lineHeight + 10;
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: startY,
    theme: "striped",
    headStyles: {
      fillColor: [20, 35, 59],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      fontSize: 10,
      halign: "center",
      cellPadding: 3,
    },
    margin: { left: 14, right: 14 },
  });

  const pdfBlob = doc.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);
  window.open(pdfURL, "_blank");
};

export default purchaseRequest;
