import React, { useState } from "react";
import { Title, ContentCard } from "../../../components";
import { Select, Input, TitleSection } from "../../../components/Form";
import { Button, Col } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ChartTitle, Tooltip, Legend);

const ReportesVentasComparativo = () => {
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroPeriodo, setFiltroPeriodo] = useState("mensual");
  const [tipoGrafica, setTipoGrafica] = useState("bar");

  // --- Datos Mock para demostración ---
  const datos = {
    etiquetas: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    sucursales: [
      { nombre: "Sucursal Norte", color: "rgba(59,130,246,0.7)", valores: [12000, 15000, 13000, 18000, 20000, 22000] },
      { nombre: "Sucursal Centro", color: "rgba(34,197,94,0.7)", valores: [10000, 14000, 12000, 16000, 21000, 23000] },
      { nombre: "Sucursal Sur", color: "rgba(234,179,8,0.7)", valores: [9000, 11000, 10000, 14000, 19000, 20000] },
    ],
  };

  const dataChart = {
    labels: datos.etiquetas,
    datasets: datos.sucursales.map((sucursal) => ({
      label: sucursal.nombre,
      data: sucursal.valores,
      backgroundColor: sucursal.color,
      borderColor: sucursal.color.replace("0.7", "1"),
      borderWidth: 2,
      tension: 0.4,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top"}, // as const },
      title: { display: true, text: "Comparativa de Ventas por Sucursal" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Monto de Ventas ($)" },
      },
    },
  };

  return (
    <>
      <TitleSection title="Panel de Reportes" />
      <Title text="Comparativo de Ventas entre Sucursales" />

      <ContentCard>
        <h4 className="mb-3">Filtros del Reporte</h4>

        <div className="row mb-4">
          <Col md={4}>
            <Select
              label="Categoría"
              name="categoria"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              options={[
                { value: "todas", label: "Todas" },
                { value: "electronica", label: "Electrónica" },
                { value: "ropa", label: "Ropa" },
                { value: "alimentos", label: "Alimentos" },
              ]}
            />
          </Col>

          <Col md={4}>
            <Select
              label="Periodo"
              name="periodo"
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              options={[
                { value: "diario", label: "Diario" },
                { value: "semanal", label: "Semanal" },
                { value: "mensual", label: "Mensual" },
                { value: "anual", label: "Anual" },
              ]}
            />
          </Col>

          <Col md={4}>
            <Select
              label="Tipo de Gráfica"
              name="tipoGrafica"
              value={tipoGrafica}
              onChange={(e) => setTipoGrafica(e.target.value)}
              options={[
                { value: "bar", label: "Gráfica de Barras" },
                { value: "line", label: "Gráfica de Líneas" },
              ]}
            />
          </Col>
        </div>

        <h4 className="mb-3">Visualización de Ventas</h4>
        <div className="d-flex justify-content-center mb-4">
          <div style={{ width: "80%", minHeight: "350px" }}>
            {tipoGrafica === "bar" ? (
              <Bar data={dataChart} options={options} />
            ) : (
              <Line data={dataChart} options={options} />
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="outline-primary" onClick={() => alert("Exportando reporte a CSV...")}>
            📁 Exportar CSV
          </Button>
          <Button variant="primary" className="ms-2" onClick={() => alert("Generando PDF...")}>
            📄 Exportar PDF
          </Button>
        </div>
      </ContentCard>
    </>
  );
};

export default ReportesVentasComparativo;
