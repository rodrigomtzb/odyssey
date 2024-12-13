import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePurchaseTable = () => {
  const doc = new jsPDF();

  const empresa = "GRUPO DINÁMICA, CONSTRUCCIÓN Y ACABADOS, S.A. DE C.V.";
  const titulo = "REQUISICIÓN DE MATERIALES";
  const directora = "DIRECTOR(A) DE OPERACIONES:";
  const cliente = "CLIENTE:";
  const obra = "Obra: RESIDENCIAL PACIFICO DIAMANTE";
  const fecha = "Fecha: 05/08/2024";
  const lugar = "Lugar: ACAPULCO DE JUAREZ, GUERRERO";

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(empresa, doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
  doc.setFontSize(14);
  doc.text(titulo, doc.internal.pageSize.getWidth() / 2, 22, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(directora, doc.internal.pageSize.getWidth() / 2, 29, { align: "center" });

  doc.setFontSize(10);
  doc.text(cliente, 14, 40);
  doc.text(obra, 14, 45);
  doc.text(fecha, 140, 40);
  doc.text(lugar, 140, 45);

  const tableColumn = ["Código", "Concepto", "Unidad", "Cantidad", "P.U", "Importe total"];
  const tableRows = [
    ["1", "CLAVIJAS PARA EXTENSION", "PZA", "5", "", ""],
    ["2", "CONTACTOS INTEMPERIE PARA EXTENSION", "PZA", "10", "", ""],
    ["3", "CAJAS DE REGISTRO DE PVC", "PZA", "10", "", ""],
    ["4", "MANGUERA DE USO RUDO (cable)", "M", "100", "", ""],
    ["5", "TUBOS DE PVC 110mm", "PZA", "4", "", ""],
    ["6", "CEMENTO GRIS TOLTECA", "TON", "4", "", ""],
  ];

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 50,
    theme: 'striped',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold"
    },
    bodyStyles: {
      fontSize: 10,
      halign: "center",
      cellPadding: 3,
    },
    margin: { left: 14, right: 14 }
  });

  doc.setFontSize(10);
  doc.text("Página 1 de 1", doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10, { align: "right" });

  const pdfBlob = doc.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);
  window.open(pdfURL, "_blank");
};
